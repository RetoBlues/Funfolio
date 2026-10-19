const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const highEl = document.querySelector('.highscore span')

let score = 0
let evilHits = 0
let evilMoleCount = 0
let highScore = Number(localStorage.getItem('whackHighScore')) || 0
highEl.textContent = highScore

const sound = new Audio("bonk.mp3")

// function run() {
//     const i = Math.floor(Math.random() * holes.length)
//     // console.log(i)
//     const hole = holes[i]
//     let timer = null

//     const img = document.createElement('img')
//     img.classList.add('mole')
//     img.src = '../img/mmole.svg'

//     img.addEventListener('click', () => {
//         // alert(0)
//         score += 10
//         sound.play()
//         scoreEl.textContent = score
//         img.src = '../img/mmolehit.svg'
//         clearTimeout(timer)
//         setTimeout(() => {
//             hole.removeChild(img)
//             run()
//         }, 500)
//     })

//     hole.appendChild(img)

//     timer = setTimeout(() => {
//         hole.removeChild(img)
//         run()
//     }, getMoleTime()) // starts at 1500

// }
// run()

function getMoleTime() {
    // every 50 points, cut time caps at 500 points
    const speedUp = Math.floor(score / 50) * 110
    return Math.max(400, 1500 - speedUp);
}

function freeHoles() {
    return holes.filter(h => !h.querySelector('img'))
}

function updateScore() {
    scoreEl.textContent = score

    if (score > highScore) {
        highScore = score
        highEl.textContent = highScore
        localStorage.setItem('whackHighScore', highScore)
    }
}

function maybeAddEvil() {
    const target = Math.min(8, Math.floor(score / 150)) // 150->1, 300->2, etc max 8
    while (evilMoleCount < target) {
        evilMoleCount++
        spawn(true)
    }
}

// main
function spawn(isEvil) {
    const free = freeHoles()
    if (free.length == 0) { // max 
        setTimeout(() => spawn(isEvil), 300)
        return
    }
    const hole = free[Math.floor(Math.random() * free.length)]
    let timer = null

    const isGold = !isEvil && Math.random() < 0.025 // gold is 1:25 

    const img = document.createElement('img')
    img.classList.add('mole')
    img.draggable = false
    if (isEvil) img.src = '../img/evilmole.svg'
    else if (isGold) img.src = '../img/goldmole.svg'
    else img.src = '../img/mmole.svg'


    img.addEventListener('click', () => {
        img.style.pointerEvents = 'none' // can't double click
        clearTimeout(timer)
        sound.play()

        if (isEvil) {
            img.src = '../img/evilmolehit.svg'
            score -= 100
            evilHits++
            if (evilHits >= 3) {
                score = 0
                evilHits = 0
            }
        } else if (isGold) {
            img.src = '../img/goldmolehit.svg'
            score += 50
        } else {
            img.src = '../img/mmolehit.svg'
            score += 10
        }

        updateScore()
        maybeAddEvil()

        setTimeout(() => {
            hole.removeChild(img)
            spawn(isEvil) // moles loop cont.
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        spawn(isEvil)
    }, getMoleTime())
}
spawn(false)


//cursor
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})