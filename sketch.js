//definições da bolinha
let xBolinha = 400;
let yBolinha = 200;
let diametroBolinha = 15;
let raio = diametroBolinha / 2;

//velocidade de movimento da bolinha
let velocidadeBolinhaX = 4;
let velocidadeBolinhaY = 4;


//definições da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//definições da raquete oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar do oponente
let chanceDeErrar = 0;

let opcaoJogoMultiplayer = false;


function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(800, 400);
  //executar a trilha sonora do jogo
  //trilha.loop();
}

function draw() {
  background(000);
  
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  
  //verificaColisaoRaquete();
  //colisaoMinhaRaqueteBiblioteca();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  
  incluirPlacar();
  marcaPonto();
    
}


function mostraBolinha(){
  //tamanho e localização inicial da bolinha
  circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha(){
    //movimentação da bolinha
  xBolinha +=velocidadeBolinhaX;
  yBolinha +=velocidadeBolinhaY;
}

function verificaColisaoBorda(){
    //se estiver tocando a borda, vai quicar
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeBolinhaX *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeBolinhaY *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

//Função sobstituida pelo verificarColisaoRaquete(x,y)
function verificaColisaoRaquete(){
  if( xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeBolinhaX *= -1; 
  }
}

//Função sobstituida pelo verificarColisaoRaquete(x,y)
function colisaoMinhaRaqueteBiblioteca(){
  colidiu = collideRectCircle(xRaquete,yRaquete,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  //verifica se houve colisão
  if(colidiu){
    velocidadeBolinhaX *= -1;
  }
}

//função substituida pelo mostraRaquete(x,y);
function mostraRaqueteOponente(){
  rect(xRaqueteOponente,yRaqueteOponente,raqueteComprimento,raqueteAltura);
}

function movimentaRaqueteOponente(){
  
  if(opcaoJogoMultiplayer){
    multiplayer();
  }
  else{
    singleplayer();
  }
  

}

function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  //verifica se houve colisão
  if(colidiu){
    velocidadeBolinhaX *= -1;
    raquetada.play();
    
    if(velocidadeBolinhaX <= 15 && velocidadeBolinhaY <= 15){
    velocidadeBolinhaX +=1;
    velocidadeBolinhaY +=1;  
    }
    console.log(velocidadeBolinhaX);
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  
  textSize(16);
  
  fill(color(255,140,0));
  rect(280,10,40,20);
  fill(255);
  text(meusPontos, 300,26);
  
  fill(color(255,140,0));
  rect(480,10,40,20);
  fill(255);
  text(pontosOponente, 500,26);
}

function marcaPonto(){
  if(xBolinha > 795){
    meusPontos +=1;
    ponto.play();
  }
  if(xBolinha < 8){
    pontosOponente +=1;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar +=1
    if(chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }else{
      chanceDeErrar -= 1;
      if(chanceDeErrar <= 35){
        chanceDeErrar = 35;
      }
    }
  }
}

function multiplayer(){
    //Modo Multiplayer
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function singleplayer(){
  
  //Modo Single Player
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 20;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
  
}



