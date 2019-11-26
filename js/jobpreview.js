
(function(){
/*

UPDATE JOB DESCRIPTION PAGE CONTENT

*/
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let title = '';

let responsibilitiesElement = document.getElementById('responsibilities');



fetch(`https://agile-plateau-09650.herokuapp.com/jobopenings/${id}`)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);
   title = data.title
  // responsibilities
 let resHtml = ''
 if(data.requirements){
  for(let res in data.requirements){     
    resHtml +=`<li>
    <span><i class="fa fa-check rounded-circle p-1"></i></span>
    <p>${data.requirements[res]}</p>
  </li>`
  }
 }
  
   
  responsibilitiesElement.innerHTML = resHtml;
})




/* 

SUBMIT JOB APPLICATION FORM DATA

*/
  let jobApplicationForm= document.getElementById("jobApplication");
  // var urlParams = new URLSearchParams(window.location.search);
  // let jobTitle = urlParams.get('position');

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
          fetch('https://agile-plateau-09650.herokuapp.com/jobapplications', {
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