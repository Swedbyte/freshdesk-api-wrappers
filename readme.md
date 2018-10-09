
# Freshdesk API wrappers library

The library contains an API wrappers that are ready to work with Freshdesk platform from different environments:

* browser-frontend-app
* freshdesk-frontend-app
* freshdesk-serverless-app
* node-js-app

[Freshdesk](https://freshdesk.com/) is an intuitive and modern customer support portal that offers a flexible integration options such as [freshdesk web-interface apps](https://developers.freshdesk.com/v2/docs/your-first-app/) and [serverless apps](https://developers.freshdesk.com/v2/docs/your-first-serverless-app/).

To find more information about Freshdesk integration possibilities check out [documentation](https://developers.freshdesk.com/v2/docs/quick-start/) and [API](https://developers.freshdesk.com/api/).

## Usage Overview
Freshdesk application can be build in different environments.
One of the main goal of this library is to provide methods for consistent interface across frontend and backend.

```javascript
const freshdeskApi = new freshdeskApiKit(inputDomainName, inputApiKey);

// consistent interface across frontend and backend environments
freshdeskApi.getTicket(1).then(result => {
  console.log(`result.response `, result.response);
});
```


## Quickstart
As a quick start it might be effective to begin with 'env-templates' folder, which depend on your future app environment.

├── env-templates  
│   ├── browser-frontend-app  
│   ├── freshdesk-frontend-app  
│   ├── freshdesk-serverless-app  
│   ├── node-js-app  



## Installation
The process of installation will be different for each environment.  
Despite the fact that library is basically the same for all platforms, it has a slightly different editions.  
The differences are:
* the way to include library
* http requests method
* base-64 method for API key encoding

_To get a detailed installation step-by-step information on different platforms, please check out 'edition-notes.txt'
files which accompanies every library edition file in 'dist' (distribution) folder._

### Common parts

Library consist of the file `freshdesk-api-wrappers.js`  
Entry point of the library is `freshdeskApiKit` object variable which represent a class.

&nbsp;

In `node.js` environment, copy main file `freshdesk-api-wrappers.js` in preferred directory.  
Include as a module:  
```javascript
const freshdeskApiKit = require("./freshdesk-api-wrappers.js");
```
&nbsp;

In `browser` environment include file with 'script' tag  
It will set a global variable 'freshdeskApiKit' so you can initiate a new instance of a class.
```javascript
<script src="js/freshdesk-api-wrappers.js"></script>
```
&nbsp;

Further work will be quite the same for frontend and backend:

```javascript
const freshdeskApi = new freshdeskApiKit(inputDomainName, inputApiKey);

freshdeskApi.getTicket(1).then(result => {
  console.log(`result.response `, result.response);
});
```
_Please, be aware that node.js/serverless editions have dependencies that should be installed/included in manifest.json file.
The details described in corresponding 'edition-notes.txt'_

## Methods Listing
The list of methods is meant to be updated.

_Freshdesk API is quite dynamically evolving and a lot of new customizing features could appear in API endpoints documentation.
Feel free to pull request with working methods updates._
&nbsp;

```javascript
// All methods returns promised result and should be handled with .then(onFulfilled, onRejected)

// All methods has already build-in check for appropriate successful response status (e.g. 200)

// Default request headers for all methods are
// "Content-Type": "application/json"
// "Authorization" : `Basic ${encodedApiKey}`
// Provide 'header' parameter with the same name fields to overwrite these.

getTicket(ticketId, headers) // all 'headers' and 'body' input params have default empty values

createTicket(body, headers)

updateTicket(ticketId, body, headers)

deleteTicket(ticketId, headers)

searchTickets(search, headers)

createNoteToTicket(ticketId, body, headers)

createReplyToTicket(ticketId, body, headers)

createTopicToForum(forumId, body, headers)
```
Please, feel free to look into library methods to check out the JSDoc information.

### Promise successful result
```
{
    status: Int,
    headers: Object,
    response: JSON Object
}

// Please, be aware that in case of successful DELETE the 'response' field will be empty string ''
// which is NOT A VALID JSON object, and will throw error in JSON.parse(response) method.

```

&nbsp;
## Examples
_*all examples can be found as part of karma-tests suits_

```javascript
// All methods has already build-in check for appropriate successful response status (e.g. 200)
// in case of error it will return data into 'onRejected' callback


freshdeskApi.getTicket(4538).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.createTicket(
  {
    description: "Details about the issue...",
    subject: "Support Needed...",
    requester_id: "5039917527",
    priority: 3,
    type: "Reklamation"
  }
).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.createTicket(
  {
    description: "Details about the issue...",
    subject: "Support Needed...",
    requester_id: 5039917527,
    priority: 3,
    type: "Reklamation"
  }
).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.updateTicket(4608, {description: "updateTicket test"}).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.deleteTicket(4608).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.createNoteToTicket(4608, {body: "Hi tom, Still Angry"}).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.createReplyToTicket(4608,
  {
    body: "We are working on this issue. Will keep you posted."
  }
).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


freshdeskApi.createTopicToForum(5000168057,
  {
    sticky: true,
    locked: false,
    title: "my topic title",
    message: "my Topic message"
  }
).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


// Check out more information about method and related Freshdesk documentation in the library JSDoc
freshdeskApi.searchTickets(`status:2`).then(result => {
  const response = result.response.length > 0 ? JSON.parse(result.response) : null;
  console.log(`response `, response);
});


```