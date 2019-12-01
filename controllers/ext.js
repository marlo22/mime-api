const express = require('express');
const sqlite = require('sqlite');
const handleError = require('../helpers/handleError');

const router = express.Router();

const dbPromise = sqlite.open('./db.sqlite', { Promise, cached: true });

async function handleEmptyReq(res, db) {
  const responseData = {};

  try {
    await db.each(
      'SELECT extension_name, type_name FROM extensions e JOIN mimes m ON mime_id = m.id',
      (error, { extension_name, type_name }) => {
        if (error) return handleError(res, error);

        const currentMimeEntry = responseData[type_name];

        if (currentMimeEntry) {
          return responseData[type_name] = [...currentMimeEntry, extension_name];
        }

        responseData[type_name] = [extension_name];
      }
    );
  } catch(error) {
    handleError(error);
  }

  return res.send(response);
}

async function handleReqWithParams(req, res, db) {
  const { mime } = req.query;
  const mimes = mime.split(',');
  const responseData = {};

  for (const type of mimes) {
    if (!type) return;

    try {
      await db.each(
        `SELECT extension_name FROM extensions e JOIN mimes m ON mime_id = m.id WHERE type_name = '${type}'`,
        (error, { extension_name }) => {
          if (error) return handleError(res, error);

          const currentMimeEntry = responseData[type];
          if (currentMimeEntry) {
            responseData[type] = [...currentMimeEntry, extension_name];
          } else {
            responseData[type] = [extension_name];
          }
        }
      );
    } catch(error) {
      handleError(res, error);
    }
  }

  res.send(responseData);
}

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const { mime } = req.query;

    if (!mime) return handleEmptyReq(res, db);
    handleReqWithParams(req, res, db);
  } catch(error) {
    handleError(res, error);
  }
});

module.exports = router;
