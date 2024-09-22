
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


const startBtn = document.getElementById('btn-start')
startBtn.addEventListener('click', () => {
    isPaused = false

    body.classList.add('timer-running')

    if(isWorking) {
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


function funcUpdateTimer() {
    if(!isPaused) {
        remainingTime--

        if(remainingTime <= 0) {
            isWorking = !isWorking

            if (isWorking) {
                remainingTime = workDuration;
                body.classList.remove('rest-mode')
                body.classList.remove('timer-running')
            } else {
                remainingTime = restDuration
                body.classList.add('rest-mode')
                body.classList.remove('timer-running')

                countCompletedSessions++
                eltCompletedSessions.textContent = countCompletedSessions
            }

            isPaused = false
            body.classList.remove('timer-work-active')
        }
        
        funcUpdateProgress();
    }
}

function funcUpdateProgress() {
    const radius = 45
    const circumference = 2 * Math.PI * radius

    const totalDuration = isWorking ? workDuration : restDuration

    const dashOffset = circumference * remainingTime / totalDuration

    circleProgress.style.strokeDashoffset = dashOffset
    timerTime.textContent = toRightFormatTime(remainingTime);
}

function toRightFormatTime(sec) {
    const min = Math.floor(sec / 60)
    const remainingSec = sec % 60
    return `${min.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`
}
