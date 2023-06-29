const selecBox = document.querySelector(".selecione"),
selectXBtn = selecBox.querySelector(".opcao .playerX"),
selectOBtn = selecBox.querySelector(".opcao .playerO"),
playBoard = document.querySelector(".gameplay"),
allBox = document.querySelectorAll("section span"),
jogadores = document.querySelector(".jogadores"),
resultBox = document.querySelector(".resultado"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=> {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick","clickedBox(this)");
        
    }

    selectXBtn.onclick = ()=>{
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectOBtn.onclick = ()=>{
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
        jogadores.setAttribute("class","jogadores active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let jogadoresign = "X";
let runBot = true;

function clickedBox(element){
    if(jogadores.classList.contains("player")){
        jogadoresign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        jogadores.classList.remove("active");
        element.setAttribute("id", jogadoresign);
    }else{
        jogadoresign = "X";
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        jogadores.classList.add("active");
        element.setAttribute("id", jogadoresign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomDelayTime);
    
}

function bot(runBot){
        if(runBot){
        let array = [];
        jogadoresign = "O";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
            
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(jogadores.classList.contains("player")){
                jogadoresign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                jogadores.classList.add("active");
                allBox[randomBox].setAttribute("id", jogadoresign);
            
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                jogadores.classList.remove("active");
                allBox[randomBox].setAttribute("id", jogadoresign);
            } 
            selectWinner(); 
        }
        allBox[randomBox].style.pointerEvents = "none";
    }
}

function getClass(idname){
    return document.querySelector(".box"+ idname).id;
}

function checkClass(val1,val2,val3,sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkClass(1,2,3,jogadoresign) || checkClass(4,5,6,jogadoresign) || checkClass(7,8,9,jogadoresign) || checkClass(1,4,7,jogadoresign) || checkClass(2,5,8,jogadoresign) || checkClass(3,6,9,jogadoresign) || checkClass(1,5,9,jogadoresign) || checkClass(3,5,7,jogadoresign))
    {
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);
        wonText.innerHTML = `Jogador <p>${jogadoresign}</p> Ganhou!`;
    }else{

        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""  ){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },700);
            wonText.textContent = `Jogo Empatou!`;
        }

    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}
