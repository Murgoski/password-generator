
function getRangeValue(val) {
    var rangeValue = +document.getElementById("inputRange").value;
    document.getElementById('rangeResult').innerHTML = rangeValue;
}

var rangeValue = document.getElementById("inputRange").value;
var upperLettersEl = document.getElementById("uppercaseLetters");
var lowerLettersEl = document.getElementById("lowercaseLetters");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var genButtonEl = document.getElementById("generateButton");
var resultEl = document.getElementById("password-result");

function genUpperRandom(){
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

function genLowerRandom(){
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}

function genNumberRandom(){
    return String(Math.floor(Math.random() * 10));
    /* console.log(String(Math.floor(Math.random() * 100))); */
}

function genSymbolsRandom(){
    var symbols = "!@#$%&*()_+[]{};:,.<>?/";
    return symbols[Math.floor(Math.random() * symbols.length)];
}


function generatePassword() {

    var rangeValue = +document.getElementById("inputRange").value;
    var checkboxLen = document.querySelectorAll('input[type="checkbox"]:checked').length;

    var notificationEl = document.getElementById("notification");
    var iconEl = document.querySelector(".icon");
    var titleEl = document.querySelector(".title");
    var messageEl = document.querySelector(".message");
    
    if (checkboxLen < 1) {
        /* console.log("Označi vsaj eno možnost!!"); */
        notificationEl.classList.add("show");
        notificationEl.classList.add("error");
        iconEl.innerHTML = "<i class='bx bx-x'></i>";
        titleEl.textContent = "Error!";
        messageEl.textContent = "Please choose at least one option!";
        genButtonEl.disabled = true; // Disable button
        genButtonEl.classList.add("disabledBtn")
        setTimeout(() => {
            genButtonEl.disabled = false;
            genButtonEl.classList.remove("disabledBtn");
        }, 2000);  

        setTimeout(() => {
            notificationEl.classList.remove("show");
            notificationEl.classList.remove("error");
        }, 2000);

        return;
    }  

    /* PASSWORD GENERATE CODE */
    var allFunctions = [];

    if (upperLettersEl.checked) {
        allFunctions.push(genUpperRandom);
    }

    if (lowerLettersEl.checked) {
        allFunctions.push(genLowerRandom);
    }

    if (numbersEl.checked) {
        allFunctions.push(genNumberRandom);
    }

    if (symbolsEl.checked) {
        allFunctions.push(genSymbolsRandom);
    }

    var finalGeneratedPassword = "";

    function genRandomPassword() {
        let randomFunc = allFunctions[Math.floor(Math.random() * allFunctions.length)];
        return randomFunc();
    }

    for (let i = 0; i < rangeValue; i++){
        finalGeneratedPassword += genRandomPassword();
    }
    
    finalGeneratedPassword = finalGeneratedPassword
        .split('')  // 1. Converts a string to an array of characters
        .sort(() => Math.random() - 0.5)  // 2. Shuffles the array randomly  
        .join('');  // 3. Convert array back to string

    resultEl.innerHTML = finalGeneratedPassword;
        
}

function copyPassword() {
    // New 'textarea' element - to temporarily store the password.
    var tempElement = document.createElement("textarea");

    /* var passwordResultlEl = document.getElementById("password-result").textContent || passwordResultlEl .innerHTML; */
    var passwordResultlEl = document.getElementById("password-result")
    
    var notificationEl = document.getElementById("notification");
    var iconEl = document.querySelector(".icon");
    var titleEl = document.querySelector(".title");
    var messageEl = document.querySelector(".message");

    // If the password does not exist or is empty, show error notification and abort the function.
    // trim() - to remove any spaces.
    if (!passwordResultlEl || passwordResultlEl.textContent.trim() === "") {
        notificationEl.classList.add("show");
        notificationEl.classList.add("info");
        iconEl.innerHTML = "<i class='bx bx-info-circle'></i>";
        titleEl.textContent = "Info!";
        messageEl.textContent = "No content to copy!";
        setTimeout(function() {
            notificationEl.classList.remove("show");
            notificationEl.classList.remove("info");
        }, 2000);
        return;
    }

    tempElement.value = passwordResultlEl.textContent || passwordResultlEl.innerText;
    /* tempElement.value = passwordResultlEl; */

    // Add a 'textarea' to the body of the document so we can use it for copying.
    document.body.appendChild(tempElement);

    // We select the content in the 'textarea' so that we can copy it.
    tempElement.select();

    // We copy the selected content from the 'textarea' to the user's clipboard. execCommand("copy") deprecated - best using clipboard API.
    document.execCommand("copy");
    
    // After copying, remove the 'textarea' from the page.
    tempElement.remove();

    passwordResultlEl.textContent = "";
    notificationEl.classList.add("show");
    notificationEl.classList.add("success");
    iconEl.innerHTML = "<i class='bx bx-check'></i>";
    titleEl.textContent = "Success!";
    messageEl.textContent = "Text successfully copied to clipboard!";

    setTimeout(function() {
        notificationEl.classList.remove("show");
        notificationEl.classList.remove("success");
    }, 2000);

}

window.onload = function() {
    var popupEl = document.getElementById("popup");
    var popupContentEl = document.querySelector(".popupContent");

    setTimeout(function() {
        popupEl.style.display = 'block  ';
        setTimeout(function() {
            popupEl.style.opacity = 1;
            popupContentEl.style.transform = 'translateY(0)';
            popupContentEl.style.opacity = 1;
        }, 10); //10 ms 
    }, 10);
};


function closePopup(){
    var popupEl = document.getElementById("popup");
    var popupContentEl = document.querySelector(".popupContent");
    popupContentEl.style.transform = 'translateY(-30px)';
    popupContentEl.style.opacity = 0;
    popupEl.style.opacity = 0;
    setTimeout(function() {
        popupEl.style.display = 'none'
    }, 500);
}