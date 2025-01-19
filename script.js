let a; let b; let actionSumMinus = ""; let actionMultiplyDivide = "";
let store = 0; let i = 0;

let getAllButtons = document.querySelectorAll(".button");
let getDisplayLowerPart = document.querySelector(".operation-itself");
let getDisplayUpperPart = document.querySelector(".storageDisplay");

getAllButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.classList.value === "button number") {
            getDisplayLowerPart.textContent += `${button.textContent}`;
        } else if (button.classList.value === "button or"){
                if (getDisplayLowerPart.textContent === "") {return}
                else if (getDisplayLowerPart.textContent.includes("-")) {
                    getDisplayLowerPart.textContent = Math.abs(+getDisplayLowerPart.textContent)
                } else if (!getDisplayLowerPart.textContent.includes("-")) {
                    getDisplayLowerPart.textContent = -parseInt(getDisplayLowerPart.textContent)
                }
        } else if (button.classList.value === "button ac") {
            getDisplayUpperPart.textContent = "";
            getDisplayLowerPart.textContent = "";
            a = 0; b = 0; store = 0; i=0;
            actionSumMinus = ""; actionMultiplyDivide = "";
        } else if (button.classList.value === "button sum") {
                switch(actionMultiplyDivide) { 
                    case "/": divide(); add(); actionMultiplyDivide = ""; break; // bug fix
                    case "*": multiply(); add(); actionMultiplyDivide = ""; break; 
                    default: add(); break;
                }
        } else if (button.classList.value === "button minus") {
                    substract();
        } else if (button.classList.value === "button multiply") {
                if (actionMultiplyDivide === "/" && actionSumMinus === "") { // bug fix
                    divide(); actionMultiplyDivide = "*";
                } else if (actionSumMinus === "-") {
                    substract(); actionMultiplyDivide = "*"; actionSumMinus = "";
                } else if (actionSumMinus === "+") {
                    add(); actionMultiplyDivide = "*"; actionSumMinus = "";
                } else {
                    multiply();
                }
        } else if (button.classList.value === "button divide") {
                if (actionMultiplyDivide === "*" && actionSumMinus === "") { // bug fix
                    multiply(); actionMultiplyDivide = "/";
                } else if (actionSumMinus === "-") {
                    substract(); actionMultiplyDivide = "/"; actionSumMinus = "";
                } else if (actionSumMinus === "+") {
                    add(); actionMultiplyDivide = "*"; actionSumMinus = "";
                } else {
                    divide();
                }
        } else if (button.classList.value === "button operate") {
            operate();
        } 
        if (+getDisplayLowerPart.textContent.length < 8) {
            getDisplayLowerPart.setAttribute("style", "font-size: 90px;")
        } else if (+getDisplayLowerPart.textContent.length > 19) {
            getDisplayLowerPart.textContent = "";
        } else if (+getDisplayLowerPart.textContent.length > 8){
            getDisplayLowerPart.setAttribute("style", "font-size: 40px;")
        } 

        if (button.classList.value === "button number dot") {
            if (getDisplayLowerPart.textContent.includes(".")) {return} 
            else {getDisplayLowerPart.textContent += `${button.textContent}`;}
        } // a bit messy i know...
    });
})

function add() {
    actionSumMinus = '+';
    a = getDisplayLowerPart.textContent; // important
    getDisplayLowerPart.textContent = ""; // reset display
    store = +store + +a; // sum and store
    getDisplayUpperPart.textContent = store; // display that sum
}
function substract() {  
    if (actionMultiplyDivide === "*" && getDisplayLowerPart.textContent !== "") {
        multiply(); actionMultiplyDivide = ""; getDisplayLowerPart.textContent = "-"; // bug fix
        actionSumMinus = "-";
        return
    } else if (actionMultiplyDivide === "/" && getDisplayLowerPart.textContent !== "") {
        divide(); actionMultiplyDivide = ""; getDisplayLowerPart.textContent = "-"; // bug fix
        actionSumMinus = "-";
        return
    }

    actionSumMinus = "-";
    a = getDisplayLowerPart.textContent;
    if (!getDisplayLowerPart.textContent) {
        getDisplayLowerPart.textContent = "-" // bug fix 
    } else {
        getDisplayLowerPart.textContent = "" // bug fix
    }
    store = +store + +a;
    getDisplayUpperPart.textContent = store; // display that sum
}
function multiply() {
    actionMultiplyDivide = "*";
    if (getDisplayLowerPart.textContent === "") {return} // bug fix
    else {
        if (store === 0) {store++;}
        a = getDisplayLowerPart.textContent;
        getDisplayLowerPart.textContent = "";
        store = +store * +a;
        getDisplayUpperPart.textContent = store;
    }   
}
function divide() {
    if (getDisplayLowerPart.textContent === "") {return} // bug fix
    else {
        actionMultiplyDivide = "/";
        a = getDisplayLowerPart.textContent;
        getDisplayLowerPart.textContent = "";
        if (store == 0) {store = +store + +a;}  // in case you want to divide and theres no number, it wont do "0/a", it will just display "a" and store it
        else {store = +store / +a} // divide and store it, if theres a number to divide to
        getDisplayUpperPart.textContent = store;
    }
}
function operate() {
    b = +getDisplayLowerPart.textContent; // important

    if (actionSumMinus === "+" && actionMultiplyDivide === "") { 
        getDisplayLowerPart.textContent = `${store + b}`;
        getDisplayUpperPart.textContent = `${store} + ${b}`
        actionSumMinus = ""; // reset action if its already been done, this might help for possible bugs
    }  else if (actionMultiplyDivide === "*") { 
        getDisplayLowerPart.textContent = `${store * b}`;
        getDisplayUpperPart.textContent = `${store} x ${b}`
        actionMultiplyDivide = "";
    }  else if (actionMultiplyDivide === "/") {
        getDisplayLowerPart.textContent = `${store / b}`;
        getDisplayUpperPart.textContent = `${store} ÷ ${b}`;
        actionMultiplyDivide = "";
    }  else if (actionSumMinus === "-" && actionMultiplyDivide === "") { // actionMultiplyDivide === "" IMPORTANT, otherwise it might prioratize this function when multipliying or dividing negative numbers
        let stringIssueB = Math.abs(b) // because of a concat string issue, i had to make b posive, otherwise it displays a - -b instead of a - b
        getDisplayLowerPart.textContent = `${store + b}`;
        getDisplayUpperPart.textContent = `${store} - ${stringIssueB}`;
        actionSumMinus = "";
    }
    store = 0; // otherwise it will do store += lastResult on a new sum or other operation which is not correct
}

    const div = document.querySelector("div")
    div.addEventListener("selectstart", (e) => {e.preventDefault()}); // feels better, prevents the annoying text caret

