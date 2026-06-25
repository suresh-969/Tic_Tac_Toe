const boxs= document.querySelectorAll('.box');
const xIcon = document.getElementById('icon1');
const oIcon = document.getElementById('icon2');
const turn = document.querySelector('.turn');
const p1 = document.querySelector('.wins1');
const p2 = document.querySelector('.wins2');
const Ties = document.querySelector('.ties');
const restart = document.querySelector('.restart');
const reset = document.querySelector('.resetGame');

let player = 'X';
let wins1 = localStorage.getItem('wins1') ? parseInt(localStorage.getItem('wins1')) : 0;
let wins2 = localStorage.getItem('wins2') ? parseInt(localStorage.getItem('wins2')) : 0;
let draws = localStorage.getItem('draws') ? parseInt(localStorage.getItem('draws')) : 0;
p1.innerText = String(wins1);
p2.innerText = String(wins2);
Ties.innerText = String(draws);
const isPauseGame =false;
const isGameStart = false;

// array of win conditions
const array = [ '','','','','','','','','']
const winConditions =[[0,1,2], [3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

boxs.forEach((box, index) => {
    box.addEventListener('click', ()=> clickBox(box,index))
})

const clickBox = (box,index) => {
    if ( box.textContent== '') {
        updateBox(box,index);
        if(!checkWinner()){
            changePlayer();
        }
    }
}

const updateBox = (box,index) => {
        box.textContent=player;
        array[index] = player;
        if(player == 'X'){
            box.style.color='aquamarine';
        }
        else{
            box.style.color='yellow';
        }
}

const changePlayer = () => {
    player = (player == 'X') ? 'O' : 'X';
    turn.innerText = player + ' TURN';
    if(player == 'X'){
        turn.style.color='aquamarine';
    }
    else{
        turn.style.color='yellow';
    }
}

const checkWinner = () => {
    for ([a,b,c] of winConditions){
        if (array[a]==player && array[b]==player && array[c]==player){
            declareWinner([a,b,c]);
            if (player == 'X'){
                wins1+=1;
                localStorage.setItem('wins1', wins1);
                p1.innerText = String(wins1);
            }
            else{
                wins2+=1;
                localStorage.setItem('wins2', wins2);
                p2.innerText=String(wins2);
            }
            return true;
        }
    }
    for( i of array){
        if (i==''){
            return false;
        }
    }
    draws+=1;
    turn.innerText = 'DRAW';
    turn.style.color='rgb(8, 239, 35)';
    Ties.innerText = String(draws);
    localStorage.setItem('draws', draws);
    return True;
}

const declareWinner = (winner) => {
    turn.innerText = player + ' WON';
    winner.forEach((index) => {
        boxs[index].classList.add('winnerBox');
    })
}

restart.addEventListener('click', () => {
    window.location.href='./index.html'
})

reset.addEventListener('click', () => {
    localStorage.setItem('wins1', '0');
    localStorage.setItem('wins2', '0');
    localStorage.setItem('draws', '0');
    window.location.href='./index.html';
})


