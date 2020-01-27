
(function(){
/*

UPDATE JOB DESCRIPTION PAGE CONTENT

*/
let months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let title = '';

let responsibilitiesElement = document.getElementById('responsibilities');
 
let jobtitle=document.getElementById('jobtitle');
let description=document.getElementById('description');
let minqualifications=document.getElementById('qualifications');
let location=document.getElementById('location');
let startDate = document.getElementById('startDate');
let closeDate = document.getElementById('closeDate');
let jobtype=document.getElementById('jobtype');

fetch(`https://agile-plateau-09650.herokuapp.com/jobopenings/${id}`) 
.then(function(response){
  return response.json();
})
.then(function(data){
   
   //title = data.title

//minimum qualifications
let qualifyhtml='';
if(data.requirements){
  for(let qalify in data.requirements){
    qualifyhtml +=`<li>
    <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="none" stroke="#222da5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-right"><path d="M15 10l5 5-5 5"/><path d="M4 4v7a4 4 0 004 4h12"/></svg></span>
    <p>${data.requirements[qalify]}</p>
    </li>`
  }
}
minqualifications.innerHTML = qualifyhtml;

//job description
 
 
 
description.textContent=data.description

 
jobtitle.textContent= data.title;
title=data.title;
  // responsibilities
 let resHtml = ''
 if(data.requirements){
  for(let res in data.requirements){     
    resHtml +=`<li>
    <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" fill="none" stroke="#222da5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-down-right"><path d="M15 10l5 5-5 5"/><path d="M4 4v7a4 4 0 004 4h12"/></svg></span>
    <p>${data.requirements[res]}</p>
  </li>`
  }
 }    
  responsibilitiesElement.innerHTML = resHtml;

//job details
location.textContent=data.location;
let date1 = new Date(data.createdAt);
let startDateString = `${date1.getDate()} ${months[date1.getMonth()]} ${date1.getFullYear()}`;


// let date2 = new Date(data.dateposted);

let date2 = new Date(data.lastdate);
let closeDateString = `${date2.getDate()} ${months[date2.getMonth()]} ${date2.getFullYear()}`;
startDate.textContent = startDateString;
closeDate.textContent = closeDateString;
jobtype.textContent=data.jobtype;
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
    document.getElementById("submitApplicationButton").innerHTML = `<span>Please Wait .. <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></span>`;

    // if any errors enable send message button to re-send form data
    if(!jobApplication.checkValidity()){         
        document.getElementById("submitApplicationButton").removeAttribute("disabled");
        document.getElementById("submitApplicationButton").innerHTML =`Submit Application <i class="ml-2 far fa-paper-plane"></i>`;
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
            position:title
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
                  document.getElementById("submitApplicationButton").innerHTML = `<span>Please Wait .. <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></span>`;                                       
                  return response.json();
              })                 
              .then(function (jsondata) {                           
                document.getElementById("submitApplicationButton").removeAttribute("disabled");
                document.getElementById("submitApplicationButton").innerHTML =`Submit Application <svg xmlns="http://www.w3.org/2000/svg" class="ml-2" height="16" width="16" viewBox="0 0 172 172"><g fill="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M170.643.752a3.389 3.389 0 00-3.709-.309L1.814 89.883a3.381 3.381 0 00-1.76 3.306 3.388 3.388 0 002.324 2.93l46.938 15.318-4.542 46.467a3.378 3.378 0 002.029 3.454c.43.201.9.295 1.357.295.954 0 1.895-.403 2.553-1.155l29.603-33.446 44.572 43.94c.645.632 1.505.981 2.392.981.31 0 .618-.054.927-.134a3.395 3.395 0 002.379-2.446l41.28-165.12a3.4 3.4 0 00-1.223-3.52zM56.223 110.806l67.12-54.274-45.741 63.33-25.034 28.26z" fill="#fff"/></g></svg>`;
                jobApplicationForm.reset();
                jobApplicationForm.classList.remove('was-validated'); 
                $('#JobApplicationModal').modal('show');                 
              })
              .catch(function (error) {
                  document.getElementById("errorAlert").textContent = "Something went wrong! Please try again"
              })
       }
  }, false)
})();