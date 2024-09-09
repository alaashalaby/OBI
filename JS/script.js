$('.partner-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 15,
    dots: false,
    slideTransition: 'linear',
    autoplayTimeout: 4500,
    autoplaySpeed: 4500,
    responsiveClass: true,
    responsive: {
        0: {
            items: 2,
            nav: false
        },
        500: {
            items: 3,
            nav: false
        },
        600: {
            items: 3,
            nav: false
        },
        800: {
            items: 4,
            nav: false
        },
        1000: {
            items: 8,
            nav: false,
            loop: false
        },
        1200: {
            items: 8,
            nav: false,
            loop: false
        }
    }
});
/* =================== preloader ================= */
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector("body").classList.add("loaded");
    }, 100)
});
/* ================== Navbar Sticky ================= */

let navigation = document.getElementById("navigation");

window.addEventListener("scroll", function () {
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
async function initMap(locations) {
    const position = { lat: 24.7136, lng: 46.6753 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    for (const location of locations) {
        const marker = new AdvancedMarkerElement({
            map: map,
            position: { lat: location.lat, lng: location.lng },
            title: location.name,
        });

        marker.addListener("click", function({ domEvent, latLng }) {
            map.setZoom(100);
            map.setCenter({lat: latLng.lat(), lng: latLng.lng()});
        })
    }
}

/* ======================================= */
const form = document.querySelector("form");
const popup = document.getElementById("popupbox");
const userName = document.querySelector(".username");
const userEmail = document.querySelector(".useremail");
const userMessage = document.querySelector(".usermessage");
const submitBtn = document.querySelector(".submitbtn");
let usernameErrorMsg = document.getElementById("usernameMessage");
let emailErrorMessage = document.getElementById("emailMessage");
let textErrorMessage = document.getElementById("textMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
function validateInputs(value, regex, errorElement, message, inputElement) {
  if (regex.test(value.trim())) {
    errorElement.innerHTML = "";
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    return true;
  } else {
    errorElement.innerHTML = message;
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    return false;
  }
}

// Validate form inputs
function validateForm() {
  const isValidName = validateInputs(
    userName.value,
    /^[a-zA-Z\s]+$/,
    usernameErrorMsg,
    "UserName is Required",
    userName
  );
  const isValidEmail = validateInputs(
    userEmail.value,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    emailErrorMessage,
    "Please Enter a Valid Email",
    userEmail
  );
  const isValidMessage = validateInputs(
    userMessage.value,
    /^[a-zA-Z\s]+$/,
    textErrorMessage,
    "Message is Required",
    userMessage
  );
  return isValidName && isValidEmail && isValidMessage;
}
// Event listeners
userName.addEventListener("input", validateForm);
userEmail.addEventListener("input", validateForm);
userMessage.addEventListener("input", validateForm);

function resetInputs() {
  userName.value = "";
  userEmail.value = "";
  userMessage.value = "";
  // Remove validation classes from all inputs
  [userName, userEmail, userMessage].forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
}
function showPopup() {
  popup.classList.add("open-popup");
}
submitBtn.addEventListener("click", () => {
  if (validateForm()) {
    resetInputs();
    showPopup();
  }
});
function closePopup() {
    popup.classList.remove("open-popup");
}