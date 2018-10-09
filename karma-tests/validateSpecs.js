// swedbyte.freshdesk.com temp test with credits in ./production-tests-access.js

const freshdeskApi = new freshdeskApiKit(inputDomainName, inputApiKey, true);

describe("Freshdesk API suit", function() {
  describe("getTicket", function() {
    it("should return Ticket object", function(done) {
      freshdeskApi.getTicket(4538).then(result => {
        console.log(`result `, result);
        const response = JSON.parse(result.response);
        expect(response).toEqual(
          jasmine.objectContaining({
            id: 4538
          })
        );
        done();
      });
    });
  });

  xdescribe("createTicket", function() {
    it("should return 400 error, bad id type", function(done) {
      freshdeskApi
        .createTicket({
          description: "Details about the issue...",
          subject: "Support Needed...",
          requester_id: "5039917527",
          priority: 3,
          type: "Reklamation"
        })
        .then(result => {
          const response = JSON.parse(result.response);
          const status = result.status;
          expect(status).toEqual(400);

          done();
        });
    });

    it("should return new Ticket object", function(done) {
      freshdeskApi
        .createTicket({
          description: "Details about the issue...",
          subject: "Support Needed...",
          requester_id: 5039917527,
          priority: 3,
          type: "Reklamation"
        })
        .then(result => {
          const response = JSON.parse(result.response);
          expect(response.requester_id).toEqual(5039917527);
          done();
        });
    });
  });

  xdescribe("updateTicket", function() {
    it("should return new Ticket object", function(done) {
      freshdeskApi.updateTicket(4608, { description: "updateTicket test" }).then(result => {
        const response = JSON.parse(result.response);
        expect(response).toEqual(
          jasmine.objectContaining({
            id: 4608
          })
        );
        done();
      });
    });
  });

  xdescribe("deleteTicket", function() {
    it("should return Truthy", function(done) {
      freshdeskApi.deleteTicket(4608).then(result => {
        // "success delete" object { status: 204, response: ''} -- note, '' is not valid JSON
        // "already delete" object { status: 405, message: "Method Not Allowed", headers: {…}, response}
        expect(result.status).toEqual(204);
        done();
      });
    });
  });

  xdescribe("createNoteToTicket", function() {
    it("should return new Conversation object", function(done) {
      freshdeskApi
        .createNoteToTicket(4608, {
          body: "Hi tom, Still Angry"
        })
        .then(result => {
          const response = JSON.parse(result.response);
          expect(response.ticket_id).toEqual(4608);
          done();
        });
    });
  });

  xdescribe("createReplyToTicket", function() {
    it("should return new Conversation object", function(done) {
      freshdeskApi
        .createReplyToTicket(4608, {
          body: "We are working on this issue. Will keep you posted."
        })
        .then(result => {
          const response = JSON.parse(result.response);
          expect(response.ticket_id).toEqual(4608);
          done();
        });
    });
  });

  xdescribe("createTopicToForum", function() {
    it("should return new Topic object", function(done) {
      freshdeskApi
        .createTopicToForum(5000168057, {
          sticky: true,
          locked: false,
          title: "my topic title",
          message: "my Topic message"
        })
        .then(result => {
          const response = JSON.parse(result.response);
          expect(response.id).toEqual(jasmine.any(Number));

          done();
        });
    });
  });

  xdescribe("searchTickets", function() {
    it("should return object with Tickets", function(done) {
      freshdeskApi.searchTickets(`status:2`).then(result => {
        const response = JSON.parse(result.response);
        expect(response.total).toEqual(jasmine.any(Number));
        done();
      });
    });
  });
});
