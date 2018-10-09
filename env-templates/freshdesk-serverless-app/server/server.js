// test suit for freshdesk-api-wrappers.js
// running with fdk test environment, launched by "fdk run"

const freshdeskApiWrapper = require("./lib/freshdesk-api-wrappers");
const access = require("./test-access/production-tests-access-module");

exports = {
  events: [{ event: "onTicketCreate", callback: "onTicketCreateHandler" }],

  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onTicketCreateHandler: function(args) {
    // console.log("Hello " + args["data"]["requester"]["name"]);

    // Please, be sure to include 'base-64' dependency in your manifest.json file ("base-64": "0.1.0")
    const freshdeskApi = new freshdeskApiWrapper(
      access.inputDomainName,
      access.inputApiKey,
      true // console on
    );

    freshdeskApi.getTicket(2333).then(data => {
      console.log(`Received data: `, data);
    });
  }
};
