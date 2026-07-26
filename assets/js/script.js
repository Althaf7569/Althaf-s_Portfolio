/*=========================================================
    PROJECT ATLAS
    Portfolio V2
    Author : Althaf Hussain
=========================================================*/

"use strict";

/*=========================================================
    DOM ELEMENTS
=========================================================*/

const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".nav-menu");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".nav-menu a");
const counters = document.querySelectorAll(".counter");
const typingElement = document.getElementById("typing");
const revealEls = document.querySelectorAll(".reveal");


/*=========================================================
    TYPING ANIMATION
=========================================================*/

const typingWords = [

    "Marketing Operations Analyst",

    "Data Analytics Specialist",

    "Power BI Developer",

    "Process Automation Engineer",

    "AI Workflow Builder"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingAnimation() {

    if (!typingElement) return;

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typingAnimation, 1500);

            return;

        }

    }

    else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length)
                wordIndex = 0;

        }

    }

    setTimeout(

        typingAnimation,

        deleting ? 45 : 90

    );

}


/*=========================================================
    STICKY NAVBAR
=========================================================*/

function stickyNavbar() {

    if (window.scrollY > 50)

        navbar.classList.add("scrolled");

    else

        navbar.classList.remove("scrolled");

}

window.addEventListener(

    "scroll",

    stickyNavbar

);


/*=========================================================
    MOBILE MENU TOGGLE
=========================================================*/

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", isOpen);

        navToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

    });

}


/*=========================================================
    SMOOTH SCROLL
=========================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target = document.querySelector(

            link.getAttribute("href")

        );

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth"

        });

        // close the mobile menu after a link is tapped
        if (navMenu && navMenu.classList.contains("open")) {

            navMenu.classList.remove("open");

            navToggle.setAttribute("aria-expanded", "false");

            navToggle.innerHTML = '<i class="fas fa-bars"></i>';

        }

    });

});


/*=========================================================
    COUNTER ANIMATION
=========================================================*/

const counterObserver = new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=+counter.dataset.target;

let current=0;

const increment=target/80;

const update=()=>{

current+=increment;

if(current<target){

counter.innerText=Math.ceil(current);

requestAnimationFrame(update);

}

else{

counter.innerText=target;

}

};

update();

counterObserver.unobserve(counter);

});

},

{

threshold:.6

}

);


counters.forEach(counter=>{

counterObserver.observe(counter);

});


/*=========================================================
    REVEAL ON SCROLL
=========================================================*/

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        });

    },

    { threshold: .2 }

);

revealEls.forEach(el => revealObserver.observe(el));


/*=========================================================
    ACTIVE NAVIGATION
=========================================================*/

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

if(scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*=========================================================
    INITIALIZE
=========================================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

typingAnimation();

stickyNavbar();

}

);

/*=========================================================
    CONTACT FORM -> GOOGLE SHEETS
=========================================================*/

// Paste the Web App URL you get after deploying the Google Apps
// Script (see setup instructions) between the quotes below.
const CONTACT_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxUQVKSUNz0Ji6drsgy72hNSqP1QedwuvlRjo514lctob4VfPzs54a-cIV3dcMi9Jp_Qw/exec";

const contactForm = document.getElementById("contactForm");
const cfSubmit = document.getElementById("cf-submit");
const cfStatus = document.getElementById("cf-status");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (CONTACT_FORM_ENDPOINT.indexOf("PASTE_YOUR") === 0) {
            cfStatus.textContent = "Form endpoint not configured yet. See setup instructions.";
            cfStatus.className = "cf-status error";
            return;
        }

        const name = document.getElementById("cf-name").value.trim();
        const email = document.getElementById("cf-email").value.trim();
        const message = document.getElementById("cf-message").value.trim();

        if (!name || !email || !message) {
            cfStatus.textContent = "Please fill in all fields.";
            cfStatus.className = "cf-status error";
            return;
        }

        cfSubmit.disabled = true;
        cfSubmit.querySelector(".cf-btn-text").textContent = "Sending...";
        cfStatus.textContent = "";
        cfStatus.className = "cf-status";

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        fetch(CONTACT_FORM_ENDPOINT, {
            method: "POST",
            body: formData
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data && data.result === "success") {
                    cfStatus.textContent = "Thanks! Your message has been sent.";
                    cfStatus.className = "cf-status success";
                    contactForm.reset();
                } else {
                    throw new Error("Submission failed");
                }
            })
            .catch(function () {
                cfStatus.textContent = "Something went wrong. Please try again or email me directly.";
                cfStatus.className = "cf-status error";
            })
            .finally(function () {
                cfSubmit.disabled = false;
                cfSubmit.querySelector(".cf-btn-text").textContent = "Send Message";
            });

    });

}
