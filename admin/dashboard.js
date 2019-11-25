let token = sessionStorage.getItem('token');
 
/*
LOGOUT - USER
*/
 
function signOut(event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  window.location = "login.html";
}
document.getElementById("userName").textContent = sessionStorage.getItem("user");
document.getElementById("signOut-1").addEventListener("click", signOut);
document.getElementById("signOut-2").addEventListener("click", signOut);

/* 
   DASHBOARD - HOME
*/

// get total count and update dashboard cards
function getCount(path, elementID) {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      elementID.textContent = data;
    })
    .catch(function (error) {
      console.log(error);
    })
}

// get total messages Count
let messagesCountElement = document.getElementById("message-count");
let messageCountPath = 'https://agile-plateau-09650.herokuapp.com/enquirymessages/count';
getCount(messageCountPath, messagesCountElement);

// get total job openings count

let openingsCountElement = document.getElementById("openings-count");
let openingsCountPath = 'https://agile-plateau-09650.herokuapp.com/jobopenings/count';
getCount(openingsCountPath, openingsCountElement);

// get total job applications count
let applicationsCountElement = document.getElementById("applications-count");
let applicationsCountPath = "https://agile-plateau-09650.herokuapp.com/jobapplications/count";
getCount(applicationsCountPath, applicationsCountElement);

/*
 
  END - DASHBOARD HOME
*/

/* 
 CONTACT MESSAGES
*/
 
let messagesTab = document.getElementById('messages-tab');
let messages = document.getElementById("allMessages");

let path = "https://agile-plateau-09650.herokuapp.com/enquirymessages";
let html = '';

messagesTab.addEventListener('click', function () {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {       
      return response.json();
    })
    .then(function (data) {
      html += data.map(function (message) { 
    return (`<div class="col-lg-5 message border p-3 m-2"> 
    <h5>${message.subject}</h5>
    <p>${message.name}</p>
    <p>${message.email}</p>
    <p>${message.phone}</p>
    <p>${message.message}</p>                
</div>`);
      }).join('')
    })
    .then(function () {
      messages.innerHTML += html;
    })
    .catch(function (error) {
      console.log(error);
    })
 
})

/*
 ADMIN - GET ALL OPEN POSITIONS
*/
let openPositionsTab = document.getElementById('openings-tab');
let allOpenPositions = document.getElementById("allOpenPositions");

openPositionsTab.addEventListener("click",function(){
  let path = "https://agile-plateau-09650.herokuapp.com/jobopenings";
  let html = '';
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(function(response){
    return response.json();    
  })
  .then(function(data){
    console.log(data);
    html += data.map(function(opening){
      return `<div class="opening border p-3">
      <h5>${opening.title}</h5>
      <p>${opening.description}</p>
      <p>${opening.jobcategory}</p>
      <p>${opening.jobtype}</p>
      <p>${opening.location}</p>
      <p>${opening.dateposted}</p>       
      </div>`
    })
  })
  .then(function(){
    allOpenPositions.innerHTML = html;
  })
})


 

/*
    ADMIN - POST A NEW JOB
*/

// get job types and  categories for form drop down
let jobTypeElement = document.getElementById("jobType");
let jobTypePath = "http://localhost:1337/jobtypes";

let jobCategoryElement = document.getElementById("jobCategory");
let jobCategoryPath = "http://localhost:1337/jobcategories";

// get Job details from API - (job types, job categories)
function getJobDetails(path, selectElement) {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectElement.options.length = 0;
      data.map(function (item) {
        selectElement.options.add(new Option(item.title, item.title));
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}

// get job categories
getJobDetails(jobCategoryPath, jobCategoryElement);

// get job types
getJobDetails(jobTypePath, jobTypeElement);

// Add new job type 
let saveJobTypeButton = document.getElementById("saveJobType");

saveJobTypeButton.addEventListener('click', function (e) {
  e.preventDefault();
  let addJobTypeForm = document.getElementById("addJobType");
  let jobTypeFormData = new FormData(addJobTypeForm);
  // job type data in JSON format
  data = {
    title: jobTypeFormData.get("jobtype"),
  }

  // validate form and submit data to API
  if (addJobTypeForm.checkValidity()) {
    fetch("http://localhost:1337/jobtypes", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
 
      .then(function (response) {         
        getJobDetails(jobTypePath, jobTypeElement);
      })
      .then(function () {
        $('#jobTypeModal').modal('hide')
      })
      .catch(function (error) {
        console.log(error);
      })
  }
})

// Add new job Category
 
let saveJobCategoryButton = document.getElementById("saveJobCategory");

saveJobCategoryButton.addEventListener('click', function (e) {
  e.preventDefault();
  let addJobCategoryForm = document.getElementById("addJobCategory");
  let jobCategoryFormData = new FormData(addJobCategoryForm);
  // job type data in JSON format
  data = {
    title: jobCategoryFormData.get("jobcategory"),
  }

  // validate form and submit data to API
  if (addJobCategoryForm.checkValidity()) {
    fetch("http://localhost:1337/jobcategories", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        document.querySelector(".modal-body").innerHTML = "<h5 class='text-success'>Added Successfully</h5>";
        getJobDetails(jobCategoryPath, jobCategoryElement);
      })
      .then(function () {
        $('#jobCategoryModal').modal('hide')
      })
      .catch(function (error) {
        console.log(error);
      })
  } 
})

// submit post job form data to API

let postJobForm = document.getElementById("postJob");

postJobForm.addEventListener("submit",function(e){
  e.preventDefault();
  let postJobFormData = new FormData(postJobForm);
  let title = postJobFormData.get("title");
  let description = postJobFormData.get("description");
  let location = postJobFormData.get('location');
  let closeDate = postJobFormData.get('closedate');
  let jobType = postJobFormData.get("jobtype");
  let jobCategory = postJobFormData.get('jobcategory');

  let qualification1 = postJobFormData.get('qualification1');
  let qualification2 = postJobFormData.get('qualification2');
  let qualification3 = postJobFormData.get('qualification3');

  let requirement1 = postJobFormData.get('requirement1');
  let requirement2 = postJobFormData.get('requirement2');
  let requirement3 = postJobFormData.get('requirement3');

  let data = {
    title:title,
    description:description,
    location:location,
    jobtype:jobType,
    jobcategory:jobCategory,
    dateposted:closeDate,
    qualifications:{one:qualification1,two:qualification2,three:qualification3},
    requirements:{one:requirement1,two:requirement2,three:requirement3}     
  }
  console.log('Posting a New Job', JSON.stringify(data));
  fetch("http://localhost:1337/jobopenings", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
         return response.json();     
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      })
 
})