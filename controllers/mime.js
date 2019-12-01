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
        responseData[extension_name] = type_name;
      }
    );
  } catch(error) {
    handleError(error);
  }

  res.send(responseData);
}

async function handleReqWithParams(req, res, db) {
  const { ext } = req.query;
  const responseData = {};
  const extensions = ext.split(',');

  for (const extension of extensions) {
    if (!extension) return;

    try {
      const row = await db.get(
        `SELECT extension_name, type_name FROM extensions e JOIN mimes m ON mime_id = m.id WHERE extension_name = '${extension}'`
      );

      if (row) responseData[row.extension_name] = row.type_name;
    } catch(error) {
      handleError(res, error);
    }
  }
  
  res.send(responseData);
}

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const { ext } = req.query;

    if (!ext) return handleEmptyReq(res, db);
    handleReqWithParams(req, res, db);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
