const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        lives: document.querySelector('#livesValues'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesValue: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 700),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert(`Game Over! O seu resultado foi: ${state.values.result}`)
        location.reload()
    }
}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy')
    });

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')

    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                playSound('hit')
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
            } else {
                state.values.livesValue--
                state.view.lives.textContent = `x${state.values.livesValue}`
                console.log(state.values.livesValue)
                if (state.values.livesValue < 0) {
                    clearInterval(state.actions.countDownTimerId)
                    clearInterval(state.actions.timerId)
                    alert(`Game Over! O seu resultado foi: ${state.values.result}`)
                    location.reload()
                }
            }
        })
    });
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function initialize() {
    addListenerHitBox()
}

initialize()