$(document).ready(function() {
  app.initialized().then(function(_client) {
    window.client = _client; // To make Freshdesk 'client' available for freshdeskApiKit it is necessary to set 'client' in global scope
    client.events.on("app.activated", function() {
      // inputDomainName and inputApiKey set as globals in this particular example,
      // but in real life it probably would be available thought iparams provided from user

      const freshdeskApi = new freshdeskApiKit(inputDomainName, inputApiKey, true);

      freshdeskApi.getTicket(2333).then(data => {
        console.log(`getTicket received data: `, data); // explore the result object in browser console
      });
    });
  });
});
