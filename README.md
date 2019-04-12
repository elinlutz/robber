# robber

## Getting started

This service runs locally. First, install the projects dependencies using Yarn: 

`yarn install`

Now you should be able to start the app by running:

`yarn start`

You can run the jest tests by using the command:

`yarn test`

## Using the service

Start the service (it uses port 3000) Use some handy tool (i.e. Postman) to send your API calls to:

* **Request URLs**  
	localhost:3000/encode (to encode a sentence)  
	locialhost:3000/decode (to decode a sentence)  

* **Methods:**
  `GET` | `POST`

* **Parameters**  
Post your sentence in body, with parameter input. Server accepts Type: JSON (application/json)

* **Sample body**  

	```json
	{  
	"input": "En mening, med punkter och komman."  
	}
	```  

* **Responses**  
	200: Ok!  
	401: No input sentence in request.  
