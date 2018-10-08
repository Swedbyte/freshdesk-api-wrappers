const freshdeskApiKit = require("./lib/freshdesk-api-wrappers");
const access = require("./test-access/production-tests-access-module");

const encodedKey = Buffer.from(`${access.inputApiKey}:X`).toString("base64");

const freshdeskApi = new freshdeskApiKit(access.inputDomainName, encodedKey, true);

freshdeskApi.getTicket(2333).then(data => {
  console.log(`Received data: `, data);
});
