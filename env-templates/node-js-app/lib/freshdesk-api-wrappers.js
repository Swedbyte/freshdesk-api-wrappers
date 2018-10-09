const axios = require("axios").default;

/**
 * @version 1.4.3
 *
 * All methods return promised result and should be handled with .then(onFulfilled, onRejected)
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

const freshdeskApiKit = (function() {
  const { set: setPrivate, get: getPrivate } = WeakMap.prototype;
  const _access = new WeakMap();

  class freshdeskApiKit {
    /**
     * @param domainName -- my.domain.name
     * @param apiKey -- x56g3vwyen6er
     * @param logging -- public logs on/off
     */
    constructor(domainName, apiKey, logging = false) {
      this.domainName = domainName;
      this.url = `https://${domainName}/api/v2/`;
      this.logging = logging;

      setPrivate.call(_access, this, {
        headers: {
          Authorization: "Basic " + Buffer.from(`${apiKey}:X`).toString("base64"),
          "Content-Type": "application/json"
        }
      });
    }

    /**
     * Console logging on/off switcher
     * @param args
     */
    consoleDevLog(...args) {
      if (this.logging) {
        console.log(...args);
      }
    }

    /**
     * Tickets / View a Ticket
     * @see https://developers.freshdesk.com/api/#view_a_ticket
     *
     * @param ticketId
     * @param headers
     * @returns {Promise}
     */
    getTicket(ticketId, headers = {}) {
      const methodTitle = "Get Ticket";
      const requestMethod = "GET";
      const finalStatus = 200;
      const endPointUrl = `${this.url}tickets/${ticketId}`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers);
    }

    /**
     * Tickets / Create a Ticket
     * @see https://developers.freshdesk.com/api/#create_ticket
     *
     * @param body
     * @param headers
     * @returns {Promise}
     */
    createTicket(body, headers = {}) {
      const methodTitle = "Create Ticket";
      const requestMethod = "POST";
      const finalStatus = 201;
      const endPointUrl = `${this.url}tickets/`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers, body);
    }

    /**
     * Tickets / Update a Ticket
     * @see https://developers.freshdesk.com/api/#update_ticket
     *
     * @param ticketId
     * @param body
     * @param headers
     * @returns {Promise}
     */
    updateTicket(ticketId, body = {}, headers = {}) {
      const methodTitle = "Update Ticket";
      const requestMethod = "PUT";
      const finalStatus = 200;
      const endPointUrl = `${this.url}tickets/${ticketId}`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers, body);
    }

    /**
     * Tickets / Delete a Ticket
     * @see https://developers.freshdesk.com/api/#delete_a_ticket
     *
     * @param ticketId
     * @param headers
     * @returns {Promise}
     */
    deleteTicket(ticketId, headers = {}) {
      const methodTitle = "Delete Ticket";
      const requestMethod = "DELETE";
      const finalStatus = 204; //  405 "Method Not Allowed" if already deleted
      const endPointUrl = `${this.url}tickets/${ticketId}`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers);
    }

    /**
     * Tickets / Filter Tickets
     * search example: `type:'Merchant' AND cf_case_number:242599706`
     * @see https://developers.freshdesk.com/api/#filter_tickets
     *
     * @param search
     * @param headers
     * @returns {Promise}
     */
    searchTickets(search, headers = {}) {
      const methodTitle = "Get Ticket";
      const requestMethod = "GET";
      const finalStatus = 200;
      const endPointUrl = `${this.url}search/tickets?query="${search}"`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers);
    }

    /**
     * Conversations / Create a Note
     * @see https://developers.freshdesk.com/api/#add_note_to_a_ticket
     *
     * @param ticketId
     * @param body
     * @param headers
     * @returns {Promise}
     */
    createNoteToTicket(ticketId, body = {}, headers = {}) {
      const methodTitle = "Create Note To Ticket";
      const requestMethod = "POST";
      const finalStatus = 201;
      const endPointUrl = `${this.url}tickets/${ticketId}/notes`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers, body);
    }

    /**
     * Conversations / Create a Reply
     * @see https://developers.freshdesk.com/api/#reply_ticket
     *
     * @param ticketId
     * @param body
     * @param headers
     * @returns {Promise}
     */
    createReplyToTicket(ticketId, body = {}, headers = {}) {
      const methodTitle = "Create Note To Ticket";
      const requestMethod = "POST";
      const finalStatus = 201;
      const endPointUrl = `${this.url}tickets/${ticketId}/reply`;
      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers, body);
    }

    /**
     * Conversations / Create a Topic
     * @see https://developers.freshdesk.com/api/#topic_attributes
     *
     * @param forumId
     * @param body
     * @param headers
     * @returns {Promise}
     */
    createTopicToForum(forumId, body = {}, headers = {}) {
      const methodTitle = "Create Topic To Forum";
      const requestMethod = "POST";
      const finalStatus = 201;
      const endPointUrl = `${this.url}discussions/forums/${forumId}/topics`;

      return this.requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, headers, body);
    }

    /**
     * Abstract Request Operator for API wrapper.
     * Provides consistent interface which includes
     * request call(unified wrapper for FrontEnd/Backend http requests), logging and request errors handling.
     * @param extraHeaders
     * @param methodTitle {String} - Title of method for logging
     * @param requestMethod {String} - HTTP REQUEST METHOD: GET, PUT, POST, DELETE...
     * @param finalStatus {Number} - HTTP status of successful response: 200, 201...
     * @param endPointUrl {String} - exact API endpoint URL for particular action
     * @param body {Object} - inner parameters of request (POST, PUT)
     * @return {Promise} - data => {response json object}
     */
    requestOperator(methodTitle, requestMethod, finalStatus, endPointUrl, extraHeaders, body) {
      const headers = Object.assign(getPrivate.call(_access, this).headers, extraHeaders); // "Content-Type" could be overwritten

      this.consoleDevLog(`Trying to ${methodTitle} with request: ${endPointUrl}`);

      return this.makeRequest(requestMethod, endPointUrl, headers, body).then(
        received => {
          if (received.status === finalStatus) {
            this.consoleDevLog(`${methodTitle} successfully done. Status: ${received.status}`);
          } else {
            this.consoleDevLog(
              `Not final response code returned (${received.status}) during ${methodTitle}`,
              received.headers
            );
          }
          return received;
        },
        err => {
          this.consoleDevLog(`Error during ${methodTitle} promise. `, err);
          return err;
        }
      );
    }

    /**
     * Unified Interface for different HTTP request drivers.
     * Wrapper for different FrontEnd/Backend environments should be based on Promises.
     * Replace content of this wrapper if you need to drive API on some custom third-party library.
     * @param method {String} - HTTP REQUEST METHOD: GET, PUT, POST, DELETE...
     * @param url {String}  - Url of request
     * @param headers {Object}  - {Authorization, Content-Type}
     * @param body {Object} - inner parameters of request (for POST, PUT types of queries)
     * @return {Promise} - responseObject => {status: Int, message: String, headers: Object, response: Object}
     */
    makeRequest(method, url, headers, body) {
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
  }

  return freshdeskApiKit;
})();

module.exports = freshdeskApiKit;
