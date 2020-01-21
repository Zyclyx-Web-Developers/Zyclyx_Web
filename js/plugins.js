$(document).ready(function () {
  $(".se-pre-con").fadeOut("slow");
  AOS.init({
      once: true,
      mirror: false
  });
  document.getElementById("current-year").innerHTML = new Date().getFullYear();
});