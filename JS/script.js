$('.partner-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    margin:15,
    dots:false,
    slideTransition:'linear',
    autoplayTimeout:4500,
    autoplaySpeed:4500,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:false
        },
        500:{
            items:3,
            nav:false
        },
        600:{
            items:3,
            nav:false
        },
        800:{
            items:4,
            nav:false
        },
        1000:{
            items:8,
            nav:false,
            loop:false
        },
        1200:{
            items:8,
            nav:false,
            loop:false
        }
    }
});
/* =================== preloader ================= */
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector("body").classList.add("loaded");
    }, 100)
});
/* ================== Navbar Sticky ================= */

let navigation = document.getElementById("navigation");

window.addEventListener("scroll" , function(){
    navigation.classList.toggle("sticky", window.scrollY > 0);
})
/* ===================== scroll to top ====================== */
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#1752A1 ${scrollValue}%, #268BFF ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

/* ======================================= */
/* map */

let map;
async function initMap() {
  const position = { lat: -25.344, lng: 131.031 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "OBI",
  });
}

initMap();








let contactForm = document.getElementById("formcontact");
let errorMsg = document.querySelectorAll(".error-message");
let popup = document.getElementById("popupbox");

contactForm.addEventListener('submit', function(e) {
    if (!validateForm()) {
        e.preventDefault();
    }
});
function validateForm() {
    let nameInput = document.getElementsByName('username')[0];
    let emailInput = document.getElementsByName('useremail')[0];
    let messageInput = document.getElementsByName('message')[0];
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (nameInput.value.trim() === '') {
        showError('Please Enter your name.');
        return false;
    }
    if (!emailRegex.test(emailInput.value)) {
        showError('Please Enter a valid email.');
        return false;
    }
    if (messageInput.value.trim() === '') {
        showError('Please Enter your message.');
        return false;
    }
    if(messageInput.value.trim() !== ''){
        popup.classList.add("open-popup");
        return false;
    }
    return true;
}
function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
}
function closePopup(){
    popup.classList.remove("open-popup");
}

/* ======================================= */

