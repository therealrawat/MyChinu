
let noBtn = document.getElementById("no-btn");
let yesBtn = document.getElementById("yes-btn");
const confettiElement = document.querySelector('.confetti');
const mainDiv = document.querySelector('.mainDiv');
const feb14Div = document.querySelector('.feb14Div');
const question = document.querySelector('.question');
const btnGoup = document.querySelector('.btn-group');
const gifImage = document.querySelector(".gif");



let currentSize = parseInt(window.getComputedStyle(yesBtn).fontSize);  //Current Size of Yes Btn
noCount = 0 //noBtn press count


const noDivPhrases = [
    "No way! Be mine? ❤️",
    "Think again! Valentine? 🌹",
    "Last chance! Be mine? 😊",
    "Please say yes! 💘",
    "Don't say no! Valentine? 💌",
    "Say yes! Celebrate love! 💖",
    "Rejecting me? Just kidding! 😄",
    "No? Let's be valentines! 💑",
    "Sure? Say yes! 💗",
    "Shona, be mine! 💕",
    "Please 😢",
    "I'm gonna cry 😔",
    "Don't do this to me",
]


noBtn.addEventListener("click", noBtnClick);
yesBtn.addEventListener("click", yesBtnClick);



// FUNCTIONS

function noBtnClick() {

    // const randomIndex = Math.floor(Math.random() * noPharses.length);
    // requestDiv.textContent = noPharses[randomIndex];
    noBtn.innerHTML = getNoBtnText();


    let newSize = currentSize + (noCount * 20 + 16);
    yesBtn.style.fontSize = newSize + "px";

    noCount = noCount + 1;
}

function getNoBtnText() {
    return noDivPhrases[Math.min(noCount, noDivPhrases.length - 1)]
}

function yesBtnClick() {
    gifImage.src = "https://media.tenor.com/KFkmX5T_5LEAAAAC/love-you-brown-bear.gif";
    question.innerHTML = "Yayy!";
    noCount = 0;
    noBtn.innerHTML = "Yes";
    yesBtn.style.fontSize = currentSize + "px"; //recovering original size
    btnGoup.style.display = "none";
    mainDiv.style.display = "block";
    confettiElement.style.display = 'flex';
}