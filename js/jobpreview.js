//Submit Job application form Data
(function(){
  let jobApplicationForm= document.getElementById("jobApplication");
  var urlParams = new URLSearchParams(window.location.search);
  let jobTitle = urlParams.get('position');
  let data = ''

  jobApplicationForm.addEventListener("submit",function(event){
    event.preventDefault();
    jobApplicationForm.classList.add('was-validated');
    document.getElementById("submitApplicationButton").setAttribute("disabled",true);
    document.getElementById("btnText").style.display = "none";
    document.getElementById("btnSpinner").style.display = "block";   

    // if any errors enable send message button to re-send form data
    if(!jobApplication.checkValidity()){         
        document.getElementById("submitApplicationButton").removeAttribute("disabled");
        document.getElementById("btnText").style.display = "block";
        document.getElementById("btnSpinner").style.display = "none";   
    }

    // if no errors send form data to the API
      if (jobApplicationForm.checkValidity()) {             
          let formData = new FormData(jobApplicationForm); 
          let data ={
            firstname:formData.get('firstname'),
            lastname:formData.get('lastname'),
            email:formData.get('email'),
            phone:formData.get('phone'),
            message:formData.get('message'),
            resume: formData.get('resume'),
            position:jobTitle
          }  
          
          // console.log(data);
          fetch('http://localhost:1337/jobapplications', {
              method: 'post',
              headers: {
                  "Content-type": "application/json"
              },
              body:JSON.stringify(data)
          })
              .then(function (response) {
                  document.getElementById("submitApplicationButton").setAttribute("disabled",true);
                  document.getElementById("btnText").style.display = "none";
                  document.getElementById("btnSpinner").style.display = "block";                    
                  return response.json();
              })                 
              .then(function (jsondata) {                           
                 console.log(jsondata);
                 $('#JobApplicationModal').modal('show');
                // document.getAnimations.contactName.textContent = jsondata.name;

              })
              .catch(function (error) {
                  document.getElementById("errorAlert").textContent = "Something went wrong! Please try again"
              })
       }
  }, false)
})();



// jobpreview.addEventListener("submit", function(event){ 
// event.preventDefault()

// let firstname=document.getElementById('firstname').value;
//     let lastname=document.getElementById("lastname").value;
//     let email=document.getElementById("email").value;
//     let phone=document.getElementById("phone").value;
//     let resume=document.getElementById("validatedCustomFile").value;
//     let message=document.getElementById("message").value;
//  let data={
//      FirstName:firstname,
//      LastName:lastname,
//      Email:email,
//      PhoneNumber:phone,
//      Resume:resume,
//      Message:message,
//  }
// if(firstname !== ''&& lastname!=='' && email !== ''&& phone !== ''&& resume !==''&& message !==''){
// fetch("http://localhost:1337/jobpreviewforms", {
//   method: 'post',
//   headers: {
//     "Content-type": "application/json"
//   },
//   body:JSON.stringify(data) 
// })
//  .then(function (data) {
//   console.log('Request succeeded with JSON response', data);
//   processingData(); 
// })
// .then(function(){
//     let timeout=setTimeout(function(){
//         spinnergrow.classList.remove("spinner-grow");         
//         },2000) 
// })
// }
// else{
//   document.getElementById("error1").textContent ="Please provide required details";
//   document.getElementById("error2").textContent ="Please provide required details";
//   document.getElementById("error3").textContent ="Please provide required details";
//   document.getElementById("error4").textContent ="Please provide required details";
//   document.getElementById("error5").textContent ="Please provide required details";
//   document.getElementById("error6").textContent ="Please provide required details";
// }
// })

// let spinnergrow=document.getElementById("spinner");

// function processingData(){  
// spinnergrow.classList.add("spinner-grow"); 
// document.getElementById('contactBtn').setAttribute('disabled',true);
// }