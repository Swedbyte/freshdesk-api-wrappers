/**
 * @version
 *
 * All methods returns promised result and should be handled with .then(onFulfilled, onRejected)
 * @return {Promise} -- (response) =>
 * {
 * status: Int,
 * headers: Object,
 * response: JSON Object
 * }
 *
 * in case of successful DELETE request there will be:
 * {
 * status: 204,
 * headers: {headers}
 * response: ''
 * } -- note that '' IS NOT A VALID JSON object, and will throw error in JSON.parse(response) method.
 *
 *
 * All methods has already build-in check for appropriate successful response status (e.g. 200)
 *
 *  Default request headers for all methods are
 * "Content-Type": "application/json"
 * "Authorization" : `Basic ${encodedApiKey}`
 * Provide 'header' parameter with the same name fields to overwrite these.
 *
 * For examples check out the test suit /karma-tests/validateSpecs.js
 * or documentation at https://github.com/Swedbyte/freshdesk-api-wrappers
 *
 * */
