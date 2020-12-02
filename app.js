const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeleft = document.querySelector("#time-left");
let score = document.querySelector("#score");
let result = 0;
let currentTime = timeleft.textContent;
var high = { 'highest': 0 }
var ca = []
var c = 0

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole');
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole');
    hitpositon = randomPosition.id;
    c = 0;
}

function setcookie() {
    document.cookie = "";
    var expiresAttrib = new Date(Date.now() + 60 * 1000).toString();
    cookieString = "highest" + "=" + high['highest'] + " ; " + expiresAttrib + "; " + "SameSite=Lax";
    document.cookie = cookieString;
    console.log(document.cookie);
}

square.forEach(id => {
    id.addEventListener('mousedown', () => {
        if (c == 0) {
            if (id.id === hitpositon) {
                // debugger;
                result += 1;
                score.textContent = result;
                c++;
            }
        }
        // debugger;
    })
})

function moveMole() {
    var timerId = null;
    timerId = setInterval(randomSquare, 1000)
}

// moveMole();

function getcookie(cname) {
    var ca = cname.split("=");
    return ca[1];
}

function highest(num) {
    var com = getcookie(document.cookie);
    if (num <= com) {
        if (com == 0) {
            high['highest'] = result;
            setcookie();
        } else {
            console.log(high['highest'])
        }
    } else {
        high['highest'] = result;
        setcookie();
    }
}

function countDown() {
    currentTime--
    timeleft.textContent = currentTime
    if (currentTime === 0) {
        clearInterval(timerId)
        highest(result);
        var finalHighest = getcookie(document.cookie);
        alert('Game Over! Your Final Score is ' + result + ', highest score is ' + finalHighest);
        over();
    }
}
// let timerId = setInterval(countDown, 1000);

function start() {
    moveMole();
    timerId = setInterval(countDown, 1000);
}

function over() {
    document.getElementById('grid').innerHTML = "Game Over, Your Score is: " + result;
    document.getElementById("again").style.display = 'inline';
    document.getElementById("play").style.display = 'none';
}