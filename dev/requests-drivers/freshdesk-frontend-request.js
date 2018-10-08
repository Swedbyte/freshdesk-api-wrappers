// Not tested
// Frontend method for freshdesk platform apps to perform makeRequest in freshdesk-api-wrapper library
// The documentation about this method could be find at https://developers.freshdesk.com/v2/docs/request-api/
// 1. All apps that make requests to third-party domains must use the request API or else they will not be published in Marketplace.
// 2. Requests made using the request API should return string, JSON, or XML.
// 3. The timeout for requests is six seconds.
// 4. There is a rate limit of 50 requests per minute per app per account.

// Because of restrictions it's might be effective to use another method from 'frontend-xmlhttprequest.js' if app is not for MarketPlace
// It is based on xmlhttprequest and promises and imitates 'client.request' behavior to keep code compatible

function makeRequest(method, url, headers, body) {
  // It's required to initiate 'client' object in freshdesk's app environment
  return client.request[method.toLowerCase()](url, { headers, body });
}
