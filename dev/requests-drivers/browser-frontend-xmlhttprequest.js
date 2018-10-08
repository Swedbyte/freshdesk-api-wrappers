// Tested on PROD env
// Frontend method for browser environment to perform makeRequest() in freshdesk-api-wrapper library
// This method is independent of Freshdesk's app environment that uses his own 'request' method.
// It's made to be used by stand-alone app or another type of non-freshdesk platform applications.

function makeRequest(method, url, headers, body) {
  body = body || null;

  if (body && typeof body === "object") {
    body = JSON.stringify(body);
  }

  const responseObject = function(status, statusText, headers, response) {
    return {
      status: status,
      // message: statusText,
      headers: headers,
      response: response
    };
  };

  const extractHeaders = function(xhr) {
    const responseHeaders = {};
    xhr
      .getAllResponseHeaders()
      .split("\n")
      .forEach(header => {
        const line = header.split(": ");
        if (line[1]) {
          responseHeaders[line[0]] = line[1];
        }
      });
    return responseHeaders;
  };

  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      // Set headers
      Object.keys(headers).forEach(function(key) {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    xhr.onload = function() {
      // console.log(`XHR onload`);
      const response = responseObject(this.status, xhr.statusText, extractHeaders(xhr), xhr.response); // No JSON parse here in case of No Content ''
      this.status >= 200 && this.status < 300 ? resolve(response) : reject(response);
    };

    xhr.onerror = function() {
      // console.log(`XHR onerror`);
      reject(responseObject(this.status, xhr.statusText, extractHeaders(xhr), xhr.response));
    };

    xhr.ontimeout = function() {
      // console.log(`XHR ontimeout`);
      reject(responseObject(this.status, xhr.statusText, extractHeaders(xhr), xhr.response));
    };

    xhr.send(body);
  });
}
