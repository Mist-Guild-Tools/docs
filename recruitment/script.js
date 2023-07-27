// This is the URL for the Webhook to the Forum Channel in your Discord
var POST_URL = "your webhook";

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};

    // Determine the Thread Name with the format '[Class - Spec] Name'
    // This assumes that:
    //      Q1 is Player Name
    //      Q2 is Player Class
    //      Q3 is Player Spec
    playerName = response[0].getResponse();
    playerClass = response[1].getResponse();
    playerSpec = response[2].getResponse();
    payload['thread_name'] = '[' + playerClass + ' - ' + playerSpec + '] ' + playerName;
    
    // This adds all of the questions to the post.
    payload['content'] = '';
    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        payload['content'] += '\n\n**' + question + '**\n' + answer;
    }
  
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    };
UrlFetchApp.fetch(POST_URL, options);
};