const piano = document.querySelector('.piano')  
const pianoKeys = document.querySelectorAll('.piano-key')
const body = document.querySelector('body')
const letters = document.querySelector('.btn-letters')
const notes = document.querySelector('.btn-notes')
const fullScreenBtn = document.querySelector('.fullscreen')

function playAudio(e) {
    const letter = e.code[e.code.length - 1]
    const audio = document.querySelector(`audio[data-letter="${letter}"]`)
    const pianoKey = document.querySelector(`.piano-key[data-letter="${letter}"]`)

    if ( e.repeat ) return

    if ( !audio ) return

    audio.currentTime = 0
    audio.play()
    
    pianoKey.classList.add('piano-key-active')
}

function removeAudio(e) {
    const letter = e.code[e.code.length - 1]
    const pianoKey = document.querySelector(`.piano-key[data-letter="${letter}"]`)

    if (!pianoKey) return

    pianoKey.classList.remove('piano-key-active')
}
window.addEventListener('keyup', removeAudio ) 
window.addEventListener('keydown', playAudio)
//keybord
function moveStop(e) {
    e.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
} 
function movePlay(e) {

    let letter = e.target.dataset.letter
    let audio = document.querySelector(`audio[data-letter="${letter}"]`)

    audio.currentTime = 0
    audio.play()
    e.target.classList.add('piano-key-active', 'piano-key-active-pseudo')
}

function playAudioM(e) {
    e.target.classList.add('piano-key-active', 'piano-key-active-pseudo')
    e.target.classList.remove('piano-key-remove-mouse')
    
    const note = e.target.dataset.note
    const audio = document.querySelector(`audio[data-note="${note}"]`)
    audio.currentTime = 0
    audio.play()

    pianoKeys.forEach((e) => {
        e.addEventListener('mouseout', moveStop)
        e.addEventListener('mouseover', movePlay)
    })
}

function stopAudioM(e) {
    if (e.target.classList.contains('piano-key') ) {
        e.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
        e.target.classList.add('piano-key-remove-mouse')
    }
    pianoKeys.forEach((e) => {
        e.removeEventListener('mouseout', moveStop)
        e.removeEventListener('mouseover', movePlay)
    })
}

function toggleFullScreen() {
    if ( document.fullscreenElement ) {
        document.exitFullscreen()
    }
    else {
        document.documentElement.requestFullscreen()
    }
}

body.addEventListener('mouseup', stopAudioM)
piano.addEventListener('mousedown', playAudioM)
fullScreenBtn.addEventListener('click', toggleFullScreen)


letters.addEventListener('click', (e) => {
    e.target.classList.add('btn-active')
    notes.classList.remove('btn-active')  
    pianoKeys.forEach((e) => {
        e.classList.add('piano-key-letter')
    })
})

notes.addEventListener('click', (e) => {
    e.target.classList.add('btn-active')
    letters.classList.remove('btn-active')
    pianoKeys.forEach((e) => {
        e.classList.remove('piano-key-letter')
    })
})