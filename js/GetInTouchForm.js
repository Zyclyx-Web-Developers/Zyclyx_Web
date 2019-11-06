
  var form= document.getElementById("GetInTouchForm");
  form.addEventListener("submit", function(event){ 
  event.preventDefault()
  var name=document.getElementById("name").value;
  var email=document.getElementById("email").value;
  var phone=document.getElementById("phone-no").value;
  var subject=document.getElementById("subject").value;
  var message=document.getElementById("message").value;

let formdata = {
  Name: name,
  Email: email,
  PhoneNumber: phone,
  Subject: subject,
  Message: message
}
//console.log(JSON.stringify(formdata));
if(name !== '' && email !== ''&& phone !== ''){
fetch("http://localhost:1337/getintouchforms", {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body:JSON.stringify(formdata) 
  })
   .then(function (data) {
    console.log('Request succeeded with JSON response', data);
    processing(); 
  })
}
else{
    document.getElementById("error1").textContent ="Please provide required details";
    document.getElementById("error2").textContent ="Please provide required details";
    document.getElementById("error3").textContent ="Please provide required details";
 }
})

function processing(){  
  let spinner=document.getElementById("spinner");
  spinner.classList.add("spinner-grow"); 
  document.getElementById('contactBtn').setAttribute("disabled",true);
  
 let timeoutID=setTimeout(function(){
spinner.classList.remove("spinner-grow");
 document.getElementById("alert").textContent ="Submited successfully!!";
    var element = document.getElementById("alert");
    element.classList.add("alert-success");
},3000) 

 
}