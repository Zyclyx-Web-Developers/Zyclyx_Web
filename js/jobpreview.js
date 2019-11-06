
var jobpreview= document.getElementById("jobpreview-form");
jobpreview.addEventListener("submit", function(event){ 
event.preventDefault()

let firstname=document.getElementById('firstname').value;
    let lastname=document.getElementById("lastname").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let resume=document.getElementById("validatedCustomFile").value;
    let message=document.getElementById("message").value;
 let data={
     FirstName:firstname,
     LastName:lastname,
     Email:email,
     PhoneNumber:phone,
     Resume:resume,
     Message:message,
 }
if(firstname !== ''&& lastname!=='' && email !== ''&& phone !== ''&& resume !==''&& message !==''){
fetch("http://localhost:1337/jobpreviewforms", {
  method: 'post',
  headers: {
    "Content-type": "application/json"
  },
  body:JSON.stringify(data) 
})
 .then(function (data) {
  console.log('Request succeeded with JSON response', data);
  processingData(); 
})
}
else{
  document.getElementById("error1").textContent ="Please provide required details";
  document.getElementById("error2").textContent ="Please provide required details";
  document.getElementById("error3").textContent ="Please provide required details";
  document.getElementById("error4").textContent ="Please provide required details";
  document.getElementById("error5").textContent ="Please provide required details";
  document.getElementById("error6").textContent ="Please provide required details";
}
})

let spinnergrow=document.getElementById("spinner");

function processingData(){  
spinnergrow.classList.add("spinner-grow"); 
document.getElementById('contactBtn').setAttribute('disabled',true);

let timeout=setTimeout(function(){
spinnergrow.classList.remove("spinner-grow");
alert("Submited successfully!!");
},2000) 
}