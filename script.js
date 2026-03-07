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

function showSlides(){

slides.forEach(slide => slide.style.display = "none");

index++;

if(index > slides.length){
index = 1;
}

slides[index-1].style.display = "block";

setTimeout(showSlides,3000);

}

showSlides();

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



