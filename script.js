

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});



const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});



const appointmentForm =
    document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const service =
        document.getElementById("service").value;

    const date =
        document.getElementById("date").value;

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone || !service || !date) {

        alert("Please complete all required fields.");

        return;

    }

const formattedDate =
        new Date(date).toLocaleDateString(
            "en-ZA",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    const whatsappMessage =
        `Hello Gregory Phone and Computer Services.%0A%0A` +

        `I would like to book an appointment.%0A%0A` +

        `*Name:* ${name}%0A` +

        `*Phone:* ${phone}%0A` +

        `*Service:* ${service}%0A` +

        `*Preferred Date:* ${formattedDate}%0A` +

        `*Message:* ${message || "No additional message."}`;


    const whatsappNumber = "27842133696";
const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


    window.open(whatsappURL, "_blank");


    appointmentForm.reset();

});



document.getElementById("year").textContent =
    new Date().getFullYear();



const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function() {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



const dateInput =
    document.getElementById("date");


const today =
    new Date().toISOString().split("T")[0];


dateInput.setAttribute("min", today);

const faqQuestions =
document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

question.addEventListener("click", function() {


    const faqItem =
        question.parentElement;


    const answer =
        faqItem.querySelector(".faq-answer");




    /* Close other FAQ answers */


    document.querySelectorAll(".faq-item").forEach(function(item) {


        if (item !== faqItem) {


            item.classList.remove("active");


            item.querySelector(".faq-answer").style.maxHeight = null;


        }


    });

/* Open / close selected answer */

    faqItem.classList.toggle("active");


    if (faqItem.classList.contains("active")) {

        answer.style.maxHeight =
            answer.scrollHeight + "px";

    } else {

        answer.style.maxHeight = null;

    }
});

});

document.querySelectorAll('#navMenu a').forEach(function(link){
    link.addEventListener('click' , function(){
        document.getElementById( ' navMenu').classList.remove('active');

    });
});