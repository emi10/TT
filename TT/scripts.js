// Obtener elementos del DOM
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const formValue = document.getElementById('form_value');
const barTime = document.getElementById('bar_time');

let countdown = 0;  // Tiempo en segundos
let timerInterval;  // Intervalo del temporizador
let timeIsRunning = false;  // Estado del temporizador
let isPlaying = false; 
let soundPlayed = false;
let initialTime = 0;  // Guardar el tiempo inicial

// Sonidos
const lowTime = new Audio("public/sounds/low_time.mp3");
const finish = new Audio("public/sounds/Finish.mp3");

// Función para actualizar la barra de progreso
function updateBar(percentage) {
    barTime.style.width = `${percentage}%`;
}

// Función para iniciar el temporizador
function startTimer() {
    initialTime = parseInt(formValue.value) * 60;  // Convertir minutos a segundos
    countdown = initialTime;
    
    if (timerInterval) clearInterval(timerInterval);  // Limpiar el temporizador previo

    timerInterval = setInterval(() => {
        if (countdown > 0) {
            countdown--;
            const percentage = ((initialTime - countdown) / initialTime) * 100;
            updateBar(percentage);

            // Reproducir sonido si queda menos del 20%
            if (countdown <= initialTime * 0.2 && countdown > 0 && !soundPlayed) {
                lowTime.play();
                soundPlayed = true; 
            }
        } else {
            clearInterval(timerInterval);
            finish.play();
            timeIsRunning = false;  
        }
    }, 1000);
}

// Función para pausar el temporizador
function pauseTimer() {
    clearInterval(timerInterval);
}

// Función para reiniciar el temporizador
function resetTimer() {
    clearInterval(timerInterval);
    countdown = 0;
    updateBar(0);  // Reiniciar la barra a 0
    timeIsRunning = false;
    soundPlayed = false;
    togglePlayPause();  // no cambia el icono
}

// NO funciona el alternado
function togglePlayPause() {
    if (isPlaying) {
        startButton.classList.remove('paused');
        startButton.classList.add('playing');
    } else {
        startButton.classList.remove('playing');
        startButton.classList.add('paused');
    }
}

// Eventos Btn
startButton.addEventListener('click', () => {
    if (timeIsRunning) {
        pauseTimer();
        isPlaying = false;
    } else {
        startTimer();
        isPlaying = true;
    }
    togglePlayPause(); // actualiza la barra
});

restartButton.addEventListener('click', resetTimer);
