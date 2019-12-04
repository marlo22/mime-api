# mime-api
Simple REST API to searching MIME types.

## About
This API is created in Node.js - using Express.js framework and SQLite database.

## How to run it?
First, you should clone this repository, then install all required dependencies by using `npm install` or `yarn install`. If all packages will be installed run server by `npm start` or `yarn start`. By default API should be exposed on port 3000. You can change it by defining your `.env` file with `PORT={YOUR_NUMBER}` entry.

## Using API
API provides two routes - to getting MIME types by extensions and conversely - to getting extensions by MIME types.

### GET {url}/mime
Return all extensions with assign corresponding MIME type.
```js
{
    ...
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif"
    ...
}
```

### GET {url}/mime?ext=jpg,png
Return specified extensions with assign corresponding MIME type.
```js
{
    "jpg": "image/jpeg",
    "png": "image/png"
}
```

### GET {url}/ext
Return all MIME types with assign corresponding extensions.
```js
{
    ...
    "image/jpeg": [
        "jpg",
        "jpeg"
    ],
    "image/png": [
        "png"
    ],
    "image/gif": [
        "gif"
    ]
    ...
}
```

### GET {url}/ext?mime=image/jpeg,image/png
Return specified MIME types with assign corresponding extensions.
```js
{
    "image/jpeg": [
        "jpg",
        "jpeg"
    ],
    "image/png": [
        "png"
    ]
}
```

## Source
List of MIME types based on [MDN article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types).

## License
MIT
