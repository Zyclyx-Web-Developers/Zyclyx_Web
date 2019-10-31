var h = document.documentElement,
  b = document.body,
  st = 'scrollTop',
  sh = 'scrollHeight',
  progress = document.querySelector('.progress'),
  scroll;

document.addEventListener('scroll', function() {
  scroll = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  progress.style.setProperty('--scroll', scroll + '%');
});

// navbar background change on scroll
const navbar = document.querySelector(".navbar");
const videoContainer = document.querySelector(".video-container");

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
sectionOneObserver.observe(videoContainer);
// END - Navbar background change on scroll


// Footer
document.getElementById("current-year").innerHTML=new Date().getFullYear();
 
// Footer End