// axios module dependence required to be imported in freshdeskApi library file

function makeRequest(method, url, headers, body) {
  return axios({
    method: method.toLowerCase(),
    url: url,
    headers: headers,
    data: body
  }).then(data => {
    return {
      status: data.status,
      // message: data.statusText,
      headers: data.headers,
      response: data.data
    };
  });
}

module.exports = makeRequest;
