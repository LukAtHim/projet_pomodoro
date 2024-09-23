
const body = document.body
const workDuration = 10
const restDuration = 10
const timerTime = document.getElementById('timer-time')
const circleProgress = document.querySelector('.circle-progress')

let isPaused = true
let isWorking = true
let remainingTime = workDuration
let intervalId

const eltCompletedSessions = document.getElementById('session-completed')
let countCompletedSessions = 0

funcUpdateCircleProgress()

const startBtn = document.getElementById('btn-start')
startBtn.addEventListener('click', () => {
    isPaused = false

    if(isWorking) {
        body.classList.add('timer-running')
        body.classList.remove('timer-paused')
    } else {
        body.classList.add('rest-mode');
        body.classList.remove('timer-paused')
    }

    if(!intervalId) {
        intervalId = setInterval(funcUpdateTimer, 1000)
    }
})

const pauseBtn = document.getElementById('btn-pause')
pauseBtn.addEventListener('click', () => {
    isPaused = true

    body.classList.remove('timer-running')
    body.classList.add('timer-paused')
})

const resetBtn = document.getElementById('btn-reset')
resetBtn.addEventListener('click', () => {
    location.reload()
})

const settingsBtn = document.getElementById('btn-settings');
if (settingsBtn) {
    const body = document.body;

    settingsBtn.addEventListener('click', () => {
        body.classList.add('settings-open');
    });
} else {
    console.error('Le bouton "btn-settings" est introuvable.');
}

const closeBtn = document.getElementById('btn-close')
closeBtn.addEventListener('click', () => {
    // body.classList.remove('settings-open')
})

function funcUpdateTimer() {
    if(!isPaused) {
        remainingTime--

        if(remainingTime <= 0) {
            isWorking = !isWorking

            if (isWorking) {
                remainingTime = workDuration;
                body.classList.remove('rest-mode')
                body.classList.add('timer-running')
            } else {
                remainingTime = restDuration
                body.classList.add('rest-mode')
                body.classList.remove('timer-running')

                countCompletedSessions++
                eltCompletedSessions.textContent = countCompletedSessions
            }

            isPaused = false
        }
        
        funcUpdateCircleProgress();
    }
}

function funcUpdateCircleProgress() {
    const radius = 45
    const circumference = 2 * Math.PI * radius

    let totalDuration;

    if (isWorking) {
        totalDuration = workDuration;
    } else {
        totalDuration = restDuration;
    }

    const dashOffset = circumference * remainingTime / totalDuration

    circleProgress.style.strokeDashoffset = dashOffset
    timerTime.textContent = toRightFormatTime(remainingTime);
}

function toRightFormatTime(sec) {
    const min = Math.floor(sec / 60)
    const remainingSec = sec % 60
    return `${min.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`
}
