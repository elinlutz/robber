# robber

## Getting started

This service runs locally. First, install the projects dependencies using Yarn: 

`yarn install`

Now you should be able to start the app by running:

`yarn start`

You can run the jest tests by using the command:

`yarn test`

## Using the service

Start the service (it uses port 3000) Use some handy tool (i.e. postman) to send your api calls to:

* **Request URLs**
  localhost:3000/encode to encode a sentence
  locialhost:3000/decode to decode a sentence

* **Methods:**
  `GET` | `POST`

* **Parameters**
Type: JSON (application/json)

*"input": 'String'

* **Sample body**
{
	"input": "En megamening, med punkter och komman."
}


