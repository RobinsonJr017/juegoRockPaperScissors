const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

const TIE = 0;
const WIN = 1;
const LOST = 2;

const POINTS_TO_WIN = 5;

let isPlaying = false;
let playerScore = 0;
let machineScore = 0; 

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("start-text");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");
const puntosUsuario = document.getElementById("puntos-usuario");
const puntosComputadoras = document.getElementById("puntos-computadoras");
const reiniciarBtn = document.getElementById("reiniciar");

rockBtn.addEventListener("click", () => {
    play(ROCK);
});
paperBtn.addEventListener("click", () => {
    play(PAPER);
});
scissorsBtn.addEventListener("click", () => {
    play(SCISSORS);
});

reiniciarBtn.addEventListener("click", reiniciarJuego);


function play(userOption) {
    if(isPlaying) return;

    // Mostrar la elección del usuario
    document.getElementById("eleccion-usuario").style.display = "inline"; // o "block"


    isPlaying = true;

    userImg.src = "imgs/" + userOption + ".png";


    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "imgs/" + machineOption + ".png";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResult(machineOption, userOption );

        machineImg.src = "imgs/" + machineOption + ".png";

        // Mostrar sección de mensajes
        document.getElementById("mensaje").style.display = "block";

        // Actualizar el contenido de la sección de mensajes
        document.getElementById("eleccion-usuario").textContent = userOption;
        document.getElementById("eleccion-computadora").textContent = machineOption;

        switch (result) {
            case TIE:
                resultText.innerHTML = "You have tied!";
                document.getElementById("gana-punto").textContent = " Empate ";
                break;
            case WIN:
                resultText.innerHTML = "You win!";
                playerScore++;      
                document.getElementById("gana-punto").textContent = "Ganaste un punto !!!";
                break;
            case LOST:
                resultText.innerHTML = "You lost!";
                machineScore++;
                document.getElementById("gana-punto").textContent = "Perdiste un punto :(";
                break;
        }

        puntosUsuario.textContent = playerScore;
        puntosComputadoras.textContent = machineScore;

        if (playerScore === POINTS_TO_WIN || machineScore === POINTS_TO_WIN) {
            mostrarBotonReiniciar();
        }        

        isPlaying = false;
    }, 2000);
}

function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE;

    } else if (userOption === ROCK) {

        if (machineOption === PAPER) return WIN;
        if (machineOption === SCISSORS) return LOST;

    } else if (userOption === PAPER) {

        if (machineOption === SCISSORS) return WIN;
        if (machineOption === ROCK) return LOST;

    } else if (userOption === SCISSORS) {

        if (machineOption === ROCK) return WIN;
        if (machineOption === PAPER) return LOST;

    }

}

function mostrarBotonReiniciar() {
    reiniciarBtn.style.display = "block";
}

function reiniciarJuego() {
    isPlaying = false;
    playerScore = 0;
    machineScore = 0;
    puntosUsuario.textContent = playerScore;
    puntosComputadoras.textContent = machineScore;
    reiniciarBtn.classList.add("disable");
    resultText.innerHTML = "Escoge una opcion para comenzar!!!";
    document.getElementById("mensaje").style.display = "none";
}