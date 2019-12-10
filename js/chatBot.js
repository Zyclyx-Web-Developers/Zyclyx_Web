function show(x) {
  if (x == 0) {
    document.getElementById("box1").style.display = "none";
  } else {
    document.getElementById("box1").style.display = "inline";
  }
}

let sessionID = null;

function getNewSession(){
  fetch('https://stark-crag-70246.herokuapp.com/session') 
  .then(function(session){
    return session.json();
  })
  .then(function(data){     
    sessionID = data.session;
  })
}

function resetSession(){
  getNewSession();
}

if(!sessionID){
  getNewSession();
  // reset session after 4.9 seconds
  setTimeout(function(){
     resetSession();
  },4900);
}

let messagesElement = document.getElementById("botMessages");

// Get Reply Message from chat bot on input submit
document
.getElementById("bot-form")
.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();
  let userText = document.getElementById("userText").value;

  // if user input not empty send API Request to chat bot
  if(userText !== ''){
  messagesElement.innerHTML += `<p id="userReplay">${userText}</p>`;   
  fetch("https://stark-crag-70246.herokuapp.com/zyclyx", {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ text: userText,session_id:sessionID })
  })
    .then(function(response) {
      // disable input and add loading...
      document.getElementById("userText").value = "";
      return response.json();
    })      
    .then(function(output){                    
        if(output[0]){
         if (output[0].text) {
            messagesElement.innerHTML += `<p id="botReplay">${output[0].text}</p>`;
          }

          if (output[0].title) {
            messagesElement.innerHTML += `<p id="botReplay">${output[0].title}</p>`;
          }

          if (output[0].description) {
            messagesElement.innerHTML += `<p id="botReplay">${output[0].description}</p>`;
          }

          if (output[0].options) {
            let html = `<p id="botReplay"> `;
            html += output[0].options
              .map(function(option) {
                return option.value.input.text;
              })
              .join(", ");
            html += "</p>";
            messagesElement.innerHTML += html;
          }    
        }            
    })
    .then(function(){
      // enable input and remove loading ...
    })
  }
});
 
// Page Loading Indicator
$(window).on("load", function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");   
});
