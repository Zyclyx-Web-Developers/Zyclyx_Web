
        $(document).ready(function () {
            //  Read job posts from DB  
            let allPositionsElement = document.getElementById('jobPositions');
            let path = "https://agile-plateau-09650.herokuapp.com/jobopenings";
            let html = '';
            fetch(path)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    localStorage.setItem("jobOpenings", data);
                    html += data.map(function (job) {
                        return (`<a href="./job-preview.html?id=${job.id}" class="col-12 d-flex justify-content-between py-4 job-item">
                                <h3 class="title-2 ml-3">${job.title}</h3>                                 
                                <p><i class="fa fa-map-marker fa-fw mr-2"></i><span>${job.location}</span></p>
    </a>`)
                    }).join('');
                })
                .then(function () {
                    allPositionsElement.innerHTML = html;
                })
        });