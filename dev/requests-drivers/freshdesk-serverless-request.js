// Tested on DEV env
// Backend method for freshdesk serverless app to perform makeRequest in freshdesk-api-wrapper library
// Freshdesk's serverless '$request' method based on promises and doesn't have limitations (on the state of middle 2018)
function makeRequest(method, url, headers, body) {
  return $request[method.toLowerCase()](url, { headers, body });
}

exports = makeRequest;
