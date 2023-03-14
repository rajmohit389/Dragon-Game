score=0;
cross=true;
let newdur;
let dinonew;



document.onkeydown = function(e){
    // console.log(e.keyCode);
    if (e.keyCode==38){
        dino=document.querySelector('.dino');
        dino.classList.add('animateDino');
        dinodur=parseFloat(window.getComputedStyle(dino,null).getPropertyValue('animation-duration'));
        // console.log(dinodur);
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, dinodur*1000);
    }
    if(e.keyCode==39){
        dino=document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dinoX=(85+dinoX) + 'px';
        dino.style.left=dinoX;
    }
    if(e.keyCode==37){
        dino=document.querySelector('.dino');
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dinoX=(dinoX-85) + 'px';
        dino.style.left=dinoX;
    }
}
setInterval(() => {
    dino=document.querySelector('.dino');
    dragon=document.querySelector('.dragon');
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('top'));
    difx=Math.abs(dx-ox);
    dify=Math.abs(dy-oy);
    // console.log(ox);
    if(difx<133 && dify<73){
        GameOver=document.querySelector('.gameover');
        GameOver.style.visibility ='visible';
        first=document.getElementById('first');
        first.innerText='Your Score: ' + score;
        dragon.classList.remove('animateDragon');
        dragon.style.left = ox + 'px';
        dino.classList.remove('animateDino');
        dino.style.top = dy + 'px';
        gaudio.pause();
        goveraudio.play();
        setTimeout(() => {
            goveraudio.pause();
        }, 1000);
    }
    else if((difx<133 && dify>73) && cross){

        score+=1;
        gameScore=document.querySelector('.score');
        gameScore.innerText='Your Score:' + score;
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1500);
        // if(score%8==0){
        //     anidur=parseFloat(window.getComputedStyle(dragon,null).getPropertyValue('animation-duration'));
        //     dinodur=parseFloat(window.getComputedStyle(dino,null).getPropertyValue('animation-duration'));
        //     // console.log(anidur);
        //     if(anidur>3){
        //         newdur=anidur-0.2;
        //         dinonew=dinodur-0.07;
        //     }
        // }
        // setTimeout(() => {
        //     dragon.style.animationDuration=newdur+'s';
        //     dino.style.animationDuration=dinonew+'s';
        // }, 1200);
        // console.log(dragon.style.animationDuration);
    }
}, 10);
button=document.getElementById('again');
button.addEventListener('click',() => {
    window.location.reload();
});