let GameOver = document.querySelector('.gameover');
let dino = document.querySelector('.dino');
let dragon = document.querySelector('.dragon');
goveraudio = new Audio('gameover.mp3');
gaudio = new Audio('music.mp3');
pauseSound = new Audio('pause.mp3');
let cross = true;
let bool = true;
let speed = 12;
let score = 0;
let shift = 8;
let lastPointTime = 0;
let maxm = document.querySelector('.maxm');
let high = document.querySelector('.high');
let max = localStorage.getItem('maxDragonScore');
// gaudio.play();
if (max == null) {
    maxm.innerText = 'Max. Score : 0';
}
else {
    maxm.innerText = 'Max. Score : ' + max;
    high.innerText = 'Max. Score : ' + max;
}

function main(ctime) {
    if (bool) {
        window.requestAnimationFrame(main);
        if (ctime - lastPointTime / 1000 < 1 / speed) {
            return;
        }
        console.log(speed);
        lastPointTime = ctime;
        gameEngine(shift);
    }
}

function gameEngine(shiftval) {
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    dragonY = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));
    difX = Math.abs(dinoX - dragonX);
    difY = Math.abs(dinoY - dragonY);

    if (difX < 133 && difY < 73) {
        GameOver.style.visibility = 'visible';
        first = document.getElementById('first');
        first.innerText = 'Your Score: ' + score;
        dragon.style.left = dragonX + 'px';
        dino.classList.remove('animateDino');
        dino.style.top = dinoY + 'px';
        dino.style.left = dinoX + 'px';
        // gaudio.pause();
        goveraudio.play();
        setTimeout(() => {
            goveraudio.pause();
        }, 1000);
    }
    else {
        dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        if (dragonX <= -195) {
            dragon.style.left = '110vw';
        }
        else {
            dragon.style.left = dragonX - shiftval + 'px';
        }

        if ((difX < 133 && difY > 73) && cross) {
            score++;
            progress = document.querySelector('.score');
            progress.innerText = `Your Score : ${score}`;
            cross = false;
            dinodur = parseFloat(window.getComputedStyle(dino, null).getPropertyValue('animation-duration'));
            setTimeout(() => {
                cross = true;
            }, dinodur * 1000 + 2);
            if ((score % 1 == 0 && score != 0) && dinodur > 0.3) {
                shift += 0.2;
                dino.style.animationDuration = (dinodur - 0.02) + 's';
            }
        }

        max = localStorage.getItem('maxDragonScore');
        if (max == null) {
            localStorage.setItem('maxDragonScore', score);
        }
        else if (max != null && score > max) {
            localStorage.setItem('maxDragonScore', score);
        }

        maxm.innerText = 'Max. Score : ' + max;
        high.innerText = 'Max. Score : ' + max;
    }
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (GameOver.style.visibility != 'visible' && bool) {
                dino.classList.add('animateDino');
                dinodur = parseFloat(window.getComputedStyle(dino, null).getPropertyValue('animation-duration'));
                setTimeout(() => {
                    dino.classList.remove('animateDino');
                }, dinodur * 1000);
            }
            pauseSound.play();
            break;
        case 'ArrowRight':
            if (GameOver.style.visibility != 'visible' && bool) {
                dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
                dx = (85 + dx) + 'px';
                dino.style.left = dx;
            }
            pauseSound.play();
            break;
        case 'ArrowLeft':
            if (GameOver.style.visibility != 'visible' && bool) {
                dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
                dx = (-85 + dx) + 'px';
                dino.style.left = dx;
            }
            pauseSound.play();
            break;
        case 'Enter':
            pauseSound.play();
            if (bool) {
                bool = false;
                bottomX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
                dino.style.bottom = bottomX + 'px';
                dino.style.animationPlayState = 'paused';
            }
            else {
                bool = true;
                bottomX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
                dinodur = parseFloat(window.getComputedStyle(dino, null).getPropertyValue('animation-duration'));
                setTimeout(() => {
                    dino.style.bottom = 2*bottomX/3 + 'px';
                }, dinodur * 300);
                setTimeout(() => {
                    dino.style.bottom = bottomX/3 + 'px';
                }, dinodur * 600);
                setTimeout(() => {
                    dino.style.bottom = 0 + 'px';
                }, dinodur * 800);
                dino.style.animationPlayState = 'running';
                // gaudio.play();
                window.requestAnimationFrame(main);
            }
        default:
            break;
    }
});
button = document.getElementById('again');
button.addEventListener('click', () => {
    window.location.reload();
});
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && GameOver.style.visibility == 'visible') {
        window.location.reload();
    }
});