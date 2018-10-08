/**
 * @version
 *
 * General returning object for all API calls of the lib will be:
 * @return {Promise} -- (response) =>
 * {
 * status: Int,
 * message: String,
 * headers: Object,
 * response: JSON Object
 * }
 *
 * in case of successful DELETE request there will be:
 * {
 * status: 204,
 * message: 'No Content',
 * headers: {headers}
 * response: ''
 * } -- note that '' IS NOT A VALID JSON object, and will throw error in JSON.parse(response) method.
 *
 * For more information about outputs check out test suit /karma-tests/validateSpecs.js
 *
 * */
