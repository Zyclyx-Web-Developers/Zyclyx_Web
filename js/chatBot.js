let isChatBotOpen = false;
let sessionID = null;
let timeOutID = null;

document.getElementById('userText').setAttribute("disabled", true);
  document.querySelector('.sendBtn').setAttribute("disabled", true);
  document.querySelector('.sendBtn').innerHTML = `<span class="spinner-border spinner-border-sm text-white" role="status">
  <span class="sr-only">Loading...</span></span>`;

// reset session after 5 minutes
function sessionTimeOut(){
  timeOutID=setTimeout(function(){     
    sessionID = null;     
    if(isChatBotOpen && sessionID === null){       
      getNewSession();  
    }    
  },300000);
}

// create a session 
function getNewSession(){
  fetch('https://stark-crag-70246.herokuapp.com/session') 
  .then(function(session){
    return session.json();
  })
  .then(function(data){     
    sessionID = data.session;
      // enable input and remove loading ...
      let userInput = document.getElementById("userText")
      userInput.removeAttribute("disabled");
      document.querySelector('.sendBtn').removeAttribute("disabled");
      document.querySelector('.sendBtn').innerHTML = ` <i class="fas fa-paper-plane text-white"></i>`;
      userInput.focus();     
  })
  .then(function(){
    if(timeOutID){
      clearTimeout(timeOutID);
    }
    sessionTimeOut();
  })
}

function show(x) {
  if (x == 0) {
    document.getElementById("box1").style.display = "none";
    isChatBotOpen = false;
  } else {
    document.getElementById("box1").style.display = "inline";
    isChatBotOpen = true;
    if(sessionID === null){
      getNewSession();
    }
  }
}

 

let messagesElement = document.getElementById("botMessages");
document
.getElementById("bot-form")
.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();
  let userText = document.getElementById("userText").value;

  // if user input not empty send API Request to chat bot
  if(userText !== '' && sessionID){
  messagesElement.innerHTML += `<p id="userReplay">${userText}</p>`;
  
  // disable user input
  document.getElementById('userText').setAttribute("disabled", true);
  document.querySelector('.sendBtn').setAttribute("disabled", true);
  document.querySelector('.sendBtn').innerHTML = `<span class="spinner-border spinner-border-sm text-white" role="status">
  <span class="sr-only">Loading...</span></span>`;
  document.getElementById("userText").value = "";


  fetch("https://stark-crag-70246.herokuapp.com/zyclyx", {
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ text: userText,session_id:sessionID })
  })
    .then(function(response) {      
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
    let userInput = document.getElementById("userText")
    userInput.removeAttribute("disabled");
    document.querySelector('.sendBtn').removeAttribute("disabled");
    document.querySelector('.sendBtn').innerHTML = ` <i class="fas fa-paper-plane text-white"></i>`;
    userInput.focus();
    })
    .then(function(){
      let chatBot=document.getElementById("scroll");   
      chatBot.scrollTop = chatBot.scrollHeight;      
    })
    .catch(function(error){
      console.log(error);
    })
  }
});
