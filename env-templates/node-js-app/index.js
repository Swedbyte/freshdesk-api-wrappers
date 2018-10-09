const freshdeskApiKit = require("./lib/freshdesk-api-wrappers");
const access = require("./test-access/production-tests-access-module");

const freshdeskApi = new freshdeskApiKit(access.inputDomainName, access.inputApiKey, true);

freshdeskApi.getTicket(2333).then(data => {
  console.log(`Received data: `, data);
});
