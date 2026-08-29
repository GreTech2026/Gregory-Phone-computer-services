
const SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co";

const SUPABASE_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
);

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

if (appointmentForm) {

    appointmentForm.addEventListener("submit", async function(event) {

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


        try {

            /* =========================
               CREATE TICKET NUMBER
            ========================= */

            const year = new Date().getFullYear();

            const randomNumber =
                Math.floor(1000 + Math.random() * 9000);

            const ticketNumber =
                `GPCS-${year}-${randomNumber}`;


            /* =========================
               SAVE BOOKING TO SUPABASE
            ========================= */

            const { error } =
                await supabaseClient
                    .from("repairs")
                    .insert([
                        {
                            ticket_number: ticketNumber,
                            customer_name: name,
                            phone: phone,
                            service: service,
                            preferred_date: date,
                            message: message,
                            status: "Booking Received"
                        }
                    ]);


            if (error) {

                console.error(error);

                alert(
                    "Could not save your booking. Please try again."
                );

                return;
            }


            /* =========================
               FORMAT DATE
            ========================= */

            const formattedDate =
                new Date(date).toLocaleDateString(
                    "en-ZA",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );


            /* =========================
               WHATSAPP MESSAGE
            ========================= */

            const whatsappMessage =
                `Hello Gregory Phone and Computer Services.%0A%0A` +

                `I would like to book an appointment.%0A%0A` +

                `*Ticket Number:* ${ticketNumber}%0A` +

                `*Name:* ${name}%0A` +

                `*Phone:* ${phone}%0A` +

                `*Service:* ${service}%0A` +

                `*Preferred Date:* ${formattedDate}%0A` +

                `*Message:* ${message || "No additional message."}`;


            const whatsappNumber =
                "27842133696";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


            /* =========================
               SHOW TICKET TO CUSTOMER
            ========================= */

            alert(
                `Booking received successfully! 🎉\n\n` +
                `Your Repair Ticket Number is:\n` +
                `${ticketNumber}\n\n` +
                `Please keep this number to track your repair.`
            );


            /* =========================
               OPEN WHATSAPP
            ========================= */

            window.open(
                whatsappURL,
                "_blank"
            );


            appointmentForm.reset();


        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong. Please try again."
            );

        }

    });

}


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


document.addEventListener("DOMContentLoaded", function () {

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotBox = document.getElementById("chatbotBox");
const chatbotClose = document.getElementById("chatbotClose");

if (chatbotToggle && chatbotBox) {

    chatbotToggle.addEventListener("click", function () {
        chatbotBox.style.display = "block";
        chatbotToggle.style.display = "none";
    });

}

if (chatbotClose && chatbotBox) {

    chatbotClose.addEventListener("click", function () {
        chatbotBox.style.display = "none";
        chatbotToggle.style.display = "block";
    });

}

});

function chatbotAction(action) {

const body = document.querySelector(".chatbot-body");

if (!body) return;


if (action === "track") {

    window.location.href = "track.html";

}


else if (action === "booking") {

    body.innerHTML = `
        <div class="bot-message">
            📅 <strong>Book a Repair</strong><br><br>
            Complete our appointment form to book
            your repair.
        </div>

        <button class="chatbot-option"
            onclick="window.location.href='#appointment'">
            📅 Open Booking Form
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('menu')">
            ⬅️ Main Menu
        </button>
    `;

}


else if (action === "phone") {

    body.innerHTML = `
        <div class="bot-message">
            📱 <strong>Phone Repairs</strong><br><br>

            • Phone troubleshooting<br>
            • Screen problems<br>
            • Charging problems<br>
            • Software problems<br>
            • General phone repairs
        </div>

        <button class="chatbot-option"
            onclick="window.location.href='#appointment'">
            📅 Book Phone Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('menu')">
            ⬅️ Main Menu
        </button>
    `;

}


else if (action === "computer") {

    body.innerHTML = `
        <div class="bot-message">
            💻 <strong>Computer Repairs</strong><br><br>

            • Laptop troubleshooting<br>
            • Windows problems<br>
            • Operating system installation<br>
            • Computer upgrades<br>
            • Virus and malware assistance
        </div>

        <button class="chatbot-option"
            onclick="window.location.href='#appointment'">
            📅 Book Computer Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('menu')">
            ⬅️ Main Menu
        </button>
    `;

}


else if (action === "menu") {

    body.innerHTML = `
        <div class="bot-message">
            Hello! 👋<br><br>
            I'm <strong>GREGORY Assistant</strong>.<br>
            How can I help you today?
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('track')">
            🔧 Track My Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('booking')">
            📅 Book a Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('phone')">
            📱 Phone Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('computer')">
            💻 Computer Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Frequently Asked Questions
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('contact')">
            📞 Contact Us
        </button>
    `;

}


else if (action === "faq") {

    body.innerHTML = `
        <div class="bot-message">
            ❓ <strong>Frequently Asked Questions</strong><br><br>
            Choose a question below and I'll help you.
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('price')">
            💰 How much does a repair cost?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('time')">
            ⏱️ How long does a repair take?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('phonefaq')">
            📱 What phone problems do you repair?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('computerfaq')">
            💻 What computer problems do you repair?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('bookingfaq')">
            📅 How do I book a repair?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('trackingfaq')">
            🔧 How do I track my repair?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('contactfaq')">
            📞 How can I contact GREGORY?
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('menu')">
            ⬅️ Main Menu
        </button>
    `;

}


else if (action === "price") {

    body.innerHTML = `
        <div class="bot-message">
            💰 <strong>Repair Costs</strong><br><br>
            Repair prices depend on the device,
            the problem and the parts required.
            <br><br>
            Contact us or book an assessment
            for an accurate repair price.
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('booking')">
            📅 Book an Assessment
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "time") {

    body.innerHTML = `
        <div class="bot-message">
            ⏱️ <strong>Repair Time</strong><br><br>
            Repair time depends on the type of problem,
            device condition and availability of parts.
            <br><br>
            We will advise you about the expected
            repair time after assessing your device.
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('booking')">
            📅 Book a Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "phonefaq") {

    body.innerHTML = `
        <div class="bot-message">
            📱 <strong>Phone Problems We Repair</strong><br><br>
            • Phone troubleshooting<br>
            • Screen problems<br>
            • Charging problems<br>
            • Software problems<br>
            • General phone repairs
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('booking')">
            📅 Book a Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "computerfaq") {

    body.innerHTML = `
        <div class="bot-message">
            💻 <strong>Computer Problems We Repair</strong><br><br>
            • Laptop troubleshooting<br>
            • Windows problems<br>
            • Operating system installation<br>
            • Computer upgrades<br>
            • Virus and malware assistance
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('booking')">
            📅 Book a Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "bookingfaq") {

    body.innerHTML = `
        <div class="bot-message">
            📅 <strong>How to Book a Repair</strong><br><br>
            Open our appointment form, provide your
            device information and describe the problem.
            Then submit your appointment request.
        </div>

        <button class="chatbot-option"
            onclick="window.location.href='#appointment'">
            📅 Open Booking Form
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "trackingfaq") {

    body.innerHTML = `
        <div class="bot-message">
            🔧 <strong>Track Your Repair</strong><br><br>
            If you already have a repair ticket number,
            use our Repair Tracking system to check
            the progress of your repair.
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('track')">
            🔧 Track My Repair
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "contactfaq") {

    body.innerHTML = `
        <div class="bot-message">
            📞 <strong>Contact GREGORY</strong><br><br>
            Need help with your device?
            Contact GREGORY PHONE AND COMPUTER SERVICES
            and we'll be happy to assist you.
        </div>

        <button class="chatbot-option"
            onclick="chatbotAction('contact')">
            📞 Contact Us
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('faq')">
            ❓ Back to FAQ
        </button>
    `;

}


else if (action === "contact") {

    body.innerHTML = `
        <div class="bot-message">
            📞 <strong>Contact GREGORY</strong><br><br>
            Need help with your device?
            We're here to assist you.
        </div>

        <button class="chatbot-option"
            onclick="window.location.href='#contact'">
            📞 Contact Us
        </button>

        <button class="chatbot-option"
            onclick="chatbotAction('menu')">
            ⬅️ Main Menu
        </button>
    `;

}

}


/* =========================================
GPCS LOADING SCREEN
========================================= */

window.addEventListener("load", function () {

setTimeout(function () {

    const loadingScreen =
        document.getElementById("gpcsLoadingScreen");

    if (loadingScreen) {

        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";

    }

}, 10000);

});