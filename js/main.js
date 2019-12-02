// Add chatbot
$("#chatBot").load("chat_bot.html");

// Page loading Indicator 
$(window).on('load', function () {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");
})
    // Home Page Slider    
    $('#homeCarousel').carousel({
      interval: 5000,
      pause: false
    })

    // Industries slider
    $('#carouselIndustries').carousel({
      interval: 8000,
    })

    //Home page  Active Slide Indicator
    let indicator = document.querySelector(".carousel-indicators::before");
    let index = 0;
    $('#homeCarousel').on('slide.bs.carousel', function (e) {
      index = e.to;
      if (index === 0) {
        document.documentElement.style.setProperty('--indicator-position', '0%');
      }
      if (index === 1) {
        document.documentElement.style.setProperty('--indicator-position', '25%');
      }
      if (index === 2) {
        document.documentElement.style.setProperty('--indicator-position', '50%');
      }
      if (index === 3) {
        document.documentElement.style.setProperty('--indicator-position', '75%');
      }
    })



// NAVBAR BACKGROUND CHANGE ON SCROLL
const navbar = document.querySelector(".navbar");
const homeContainer = document.querySelector("#homeContainer");

const sectionOneOptions = {
  rootMargin: "-80px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function( entries ) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
        navbar.classList.remove("navbar-light")
      navbar.classList.add("navbar-dark");
    } else {
      navbar.classList.remove("navbar-dark");
      navbar.classList.add("navbar-light");
    }
  });
},
sectionOneOptions);
sectionOneObserver.observe(homeContainer);
// END - NAVBAR BACKGROUND COLOR TOGGLE ON SCROLL

// DISABLE COPY PASTE AND RIGHT CLICK
//Disable cut copy paste
//Disable mouse right click
// $(document).ready(function () {  
//   $('body').bind('cut copy paste', function (e) {
//       e.preventDefault();
//   });
 
//   $("body").on("contextmenu",function(e){
//       return false;
//   });
// });
// END - DISABLE COPY PASTE AND RIGHT CLICK

// FOOTER - COPY RIGHT YEAR
document.getElementById("current-year").innerHTML=new Date().getFullYear();
 
// END - FOOTER - COPY RIGHT YEAR

