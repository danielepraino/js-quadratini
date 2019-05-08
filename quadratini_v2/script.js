// Parte 1
// Creare una griglia formata da 8x8 quadratini tutti bianchi.
// 15 di questi quadratini (scelti a caso all’inizio) se cliccati diventano rossi, gli altri diventano verdi
// Parte 2 (Bonus)
// Sopra alla griglia deve esserci un contatore che conta quanti rossi e quanti verdi sono stati scoperti

/****BONUS****/

//creo due variabili che andranno a comporre la griglia con il numero di quadratini per riga e per colonna
var gridRow = 8;
var gridCol = 8;

//creo una variabile con il numero dei quadratini rossi random
var randomSquares = 15;

//creo delle variabili per comodità, che contengono il selettore grid e score
var grid = $(".grid");
var score = $(".score");

//creo una funzione che cicla in base al numero di quadratini per riga e colonna, assegnandogli una classe "square"
//e un nome univoco dato dall'incremento della variabile squareCount, assegno anche una funzione al click
//e una classe green a tutti i quadratini della griglia
//BONUS: se il quadratino cliccato ha classe red allora incremento la variabile e modifico il testo col nuovo valore
//se ha classe green faccio la stessa cosa
function gridGen(row, col){
  var squareCount = 0;
  var scoreRed = scoreGreen = 0;
  score.append("<span class='redScore'>Rossi: " + scoreRed + "</span>");
  score.append("<span class='greenScore'>Verdi: " + scoreGreen + "</span>");
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      grid.append("<div class='square sq_" + squareCount + "'></div>");
      $(".sq_" + squareCount).click(function(){
        $(this).addClass("green");
        if($(this).hasClass("red")) {
          scoreRed++;
          $(".redScore").text("Rossi: " + scoreRed);
        } else {
          scoreGreen++;
          $(".greenScore").text("Verdi: " + scoreGreen);
        }
      });
      squareCount++;
    }
  }
}

//creo la funzione per generare 15 quadratini rossi in posizione random, senza ripeterli,
//andando poi ad assegnargli una classe "red", in questo modo se il quadratino cliccato
//ha sia classe green che classe red, lo visualizza come rosso (come regola da css),
//altrimenti viene visualizzato verde
function randomGridSquares(loop, row, col) {
  var totGrid = row*col;
  var randomArr = [];
  while(randomArr.length < loop){
    var random = Math.floor(Math.random()*totGrid);
    if(randomArr.includes(random) == false) {
      randArrLength = randomArr.length;
      randomArr.push(random);
      $(".sq_" + randomArr[randArrLength]).addClass("red");
    }
  }
  console.log("randomArr: " + randomArr);
}

//richiamo la funzione per generare la griglia, passando il numero di righe e di colonne
gridGen(gridRow, gridCol);

//richiamo la funzione per i quadratini random rossi, passando il numero di quadratini random rossi
//più il numero di righe e di colonne
randomGridSquares(randomSquares, gridRow, gridCol);

//creo due variabili che andranno a contenere i valori della larghezza e del margine del singolo quadratino
//per il margine, siccome non esiste una funzione ad hoc, mi sono dovuto arrangiare così, vado a prendere il
//valore del margine del quadratino ma lo resituisce con il "px" accanto, rendendolo inutilizzabile
//devo quindi fare un replace per avere il valore numerico "puro"
var squareWidth = $(".square").width();
var squareMargin = $(".square").css("margin").replace("px", "");

//creo una variabile per la larghezza della griglia, che sarà uguale alla somma di:
//1) la larghezza del singolo quadratino moltiplicato per il numero di quadratini per riga
//2) il margine di ogni quadratino per il numero dei quadratini per riga
//moltiplicato per due (perché il margin è sia a sx che a dx)
var gridWidth = (squareWidth*gridCol) + (squareMargin*gridCol)*2;

//assegno dinamicamente la larghezza della griglia
grid.css("width" , gridWidth);
