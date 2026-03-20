document.getElementById("bookingForm").addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let problem = document.getElementById("problem").value;

let message = "Hello Gregory, I want to book an appointment.%0A%0A"
+ "Name: " + name + "%0A"
+ "Phone: " + phone + "%0A"
+ "Problem: " + problem;

let whatsappURL = "https://wa.me/27842133696?text=" + message;

window.open(whatsappURL, "_blank");

});

let slides = document.querySelectorAll(".slide");
let index = 0;


function toggleMode(){
document.body.classList.toggle("dark");
}

window.onload = function(){
document.getElementById("loader").style.display="none";
}

function trackRepair(){

let id = document.getElementById("repairID").value;
let status = document.getElementById("status");

if(id == "1234"){
status.innerHTML = "Your phone repair is ready for collection.";
}

else if(id == "5678"){
status.innerHTML = "Your laptop is being repaired.";
}

else{
status.innerHTML = "Repair ID not found.";
}

}

function openPayment(){
document.getElementById("paymentPopup").style.display="flex";
}

function closePayment(){
document.getElementById("paymentPopup").style.display="none";
}


let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;
let message = document.getElementById("loginMessage");

if(user === "customer" && pass === "1234"){

message.innerHTML = "Login successful. Welcome!";
window.location.href = "dashboard.html";

}

else{

message.innerHTML = "Incorrect username or password.";

}

function checkTicket(){

let id = document.getElementById("ticketID").value;
let status = document.getElementById("ticketStatus");

// Example repair tickets
let tickets = {
"GP1001":"Your phone repair is complete. Ready for pickup.",
"GP1002":"Your laptop is being repaired. Estimated ready in 2 days.",
"GP1003":"Your computer repair is in progress. Technician assigned: Gregory.",
"GP1004":"Your tablet repair is complete. Payment received."
};

if(tickets[id]){
status.innerHTML = tickets[id];
status.style.color = "green";
} else {
status.innerHTML = "Ticket ID not found. Please check again.";
status.style.color = "red";
}

}

function checkTicket(){

let id = document.getElementById("ticketID").value;
let status = document.getElementById("ticketStatus");

// Example repair tickets
let tickets = {
"GP1001":"Your phone repair is complete. Ready for pickup.",
"GP1002":"Your laptop is being repaired. Estimated ready in 2 days.",
"GP1003":"Your computer repair is in progress. Technician assigned: Gregory.",
"GP1004":"Your tablet repair is complete. Payment received."
};

if(tickets[id]){
status.innerHTML = tickets[id];
status.style.color = "green";
} else {
status.innerHTML = "Ticket ID not found. Please check again.";
status.style.color = "red";
}

}// Example customers and tickets
const customers = {
    "Promise": { password: "1234", tickets: {
        "GP1001":"Phone repair complete. Ready for pickup.",
        "GP1005":"Laptop repair in progress. Ready in 2 days."
    }},
    "Benjamin": { password: "abcd", tickets: {
        "GP1002":"Tablet repair complete. Ready for pickup."
    }},
    "Naomie": { password: "5678", tickets: {
        "GP1003":"Computer repair in progress. Technician assigned: Gregory."
    }}
};

function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let message = document.getElementById("loginMessage");

    if(customers[user] && customers[user].password === pass){
        message.innerHTML = "Login successful. Welcome, " + user + "!";
        message.style.color = "green";

        // Save logged in user
        sessionStorage.setItem("loggedInUser", user);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        message.innerHTML = "Incorrect username or password.";
        message.style.color = "red";
    }
}


function toggleMenu(){
const menu = document.querySelector(".nav-menu");
menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}





