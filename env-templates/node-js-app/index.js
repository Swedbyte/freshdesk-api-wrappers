const freshdeskApiKit = require("./lib/freshdesk-api-wrappers");

const access = require("./test-access/production-tests-access-module");
// This is production test access
// Please, provide your own access: domainName and apiKey
// e.g. domainName = 'my.domain.name', apiKey = '3n6345674hyebs'

const freshdeskApi = new freshdeskApiKit(access.inputDomainName, access.inputApiKey, true);

freshdeskApi.getTicket(2333).then(data => {
  console.log(`Received data: `, data);
});
