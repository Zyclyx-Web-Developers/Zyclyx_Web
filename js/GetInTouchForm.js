(function () {
  let form = document.getElementById("contactForm");
  
  form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.classList.add('was-validated');

      if (form.checkValidity()) {             
          let formData = new FormData(form); 
          data ={ 
              name:formData.get("Name"),
              email:formData.get("Email"),
              phone:formData.get("Phone"),
              subject:formData.get("Subject"),
              message:formData.get("Message")
          }           
          fetch('http://localhost:1337/enquirymessages', {
              method: 'post',
              headers: {
                  "Content-type": "application/json"
              },
              body:JSON.stringify(data)
          })
              .then(function (response) {
                  document.getElementById("contactBtn").setAttribute("disabled",true);
                  document.getElementById("btnText").style.display = "none";
                  document.getElementById("btnSpinner").style.display = "block";                    
                  return response.json();
              })                 
              .then(function (jsondata) {
                console.log(jsondata);
          
              })
              .catch(function (error) {
                  document.getElementById("errorAlert").textContent = "Something went wrong! Please try again"
              })
       }
  }, false)
})();

 
 
 
//  var form= document.getElementById("GetInTouchForm");
//   form.addEventListener("submit", function(event){ 
//   event.preventDefault()
//   var name=document.getElementById("name").value;
//   var email=document.getElementById("email").value;
//   var phone=document.getElementById("phone-no").value;
//   var subject=document.getElementById("subject").value;
//   var message=document.getElementById("message").value;

// let formdata = {
//   Name: name,
//   Email: email,
//   PhoneNumber: phone,
//   Subject: subject,
//   Message: message
// }
 
// if(name !== '' && email !== ''&& phone !== ''){
// fetch("http://localhost:1337/getintouchforms", {
//     method: 'post',
//     headers: {
//       "Content-type": "application/json"
//     },
//     body:JSON.stringify(formdata) 
//   })
//    .then(function (data) {
//     console.log('Request succeeded with JSON response', data);
//     processing(); 
//   })
// }
// else{
//     document.getElementById("error1").textContent ="Please provide required details";
//     document.getElementById("error2").textContent ="Please provide required details";
//     document.getElementById("error3").textContent ="Please provide required details";
//  }
// })

// function processing(){  
//   let spinner=document.getElementById("spinner");
//   spinner.classList.add("spinner-grow"); 
//   document.getElementById('contactBtn').setAttribute("disabled",true);
  
//  let timeoutID=setTimeout(function(){
// spinner.classList.remove("spinner-grow");
//  document.getElementById("alert").textContent ="Submited successfully!!";
//     var element = document.getElementById("alert");
//     element.classList.add("alert-success");
// },3000) 

 
// }