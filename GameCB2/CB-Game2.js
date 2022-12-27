// ################################ //

class molTable {
  constructor(nb, img, nameA, nameB, exact){
    this.nb = nb;
    this.img = img;
    this.nameA = nameA;
    this.nameB = nameB;
    this.exact = exact;
  }
}

// ################################ //

function molTableConstruction(molTableFin) {
  document.getElementById("testTable").style.display = "block";
  let color;
  for(elem in molTableFin){
    if(molTableFin[elem].exact == 1){
      color = 'class="table-success"';
    }else{
      color = 'class="table-danger"';
    }

    document.getElementById("testTableMol").innerHTML += `<tr ${color}><th scope="row">${molTableFin[elem].nb}</th><td><img src="${molTableFin[elem].img}" width="100px" class="text-center img-fluid" ></td><td>${molTableFin[elem].nameA}</td><td>${molTableFin[elem].nameB}</td></tr>`;
  }
}

// ################################ //

function nombreAleatoire(limite, nbPrecedent){
  let nbAleatoire = Math.floor(Math.random()*limite);
  
  while(nbPrecedent == nbAleatoire){

    nbAleatoire = Math.floor(Math.random()*limite);
  }
  return nbAleatoire
}

// ################################ //

const nombreTotalMol = dataCB.length;
let molNb = null;

// ##### //

function newMolAleatoire(limite, nbPrecedent){
  let temp = null;
  if(nbPrecedent == null){
    temp = Math.floor(Math.random()*limite);
  }else{
    temp = nombreAleatoire(limite, nbPrecedent);
  }
  return temp;
}

// ##### //

function parsingTemps(temps){
  let minutes = parseInt(temps / 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes
  let secondes = parseInt(temps % 60, 10);
  secondes = secondes < 10 ? "0" + secondes : secondes
  return minutes + ":" + secondes
}


// ##### //

function propositions(limite, molNb){
  // Tirage au sort de 4 nombres, 4 propositions
  let listeOutput = [];
  let temp = null;

  listeOutput.push(molNb);

  while(listeOutput.length < 4){
    temp = nombreAleatoire(limite, molNb);
    if(listeOutput.indexOf(temp) == -1){
      listeOutput.push(temp);
    }
  }
  listeOutput = listeOutput.sort((a,b) => 0.5 - Math.random());

  let listeOutputNoms = [];
  for(i in listeOutput){
    listeOutputNoms.push(dataCB[listeOutput[i]][3]);
  }

  return listeOutputNoms;
}

// ################################ //

let tempsMax = 0;
let temps = 0;
let modeQuestions = 0;
let nbQuestions = 0;
let nbQuestionsMax = 1000;
let molTableFin = [];
let highscoresType = "";
let highscoresMax = 10;
let radioChoix = "";
let localStorageDict = {"radiochoix1":"highscoresTime1min",
                        "radiochoix2":"highscoresTime2min",
                        "radiochoix3":"highscoresNb20",
                        "radiochoix4":"highscoresNb50"};

// Init
getHighscores(localStorageDict[radiochoix2])

const timerElement = document.getElementById("timer");

// ##### //

function timerCB(){
  timerElement.innerText = parsingTemps(temps);

  let timerBarrePourcentage = Math.round(100*100*temps/tempsMax)/100;

  document.getElementById("timerBarre").style.width = timerBarrePourcentage + "%";
  
  if(temps == 0){

    sequenceFin();

  }

  temps --;
}

// ##### //

function timerCB_count(){
  timerElement.innerText = parsingTemps(temps);
  temps ++;
}

// ################################ //

function initialisation(){
  radioChoix = document.querySelector('input[name=btnradio]:checked').value;
  
  highscoresType = localStorageDict[radioChoix];

  // Choix 1 = Temps 60 secondes
  if(radioChoix == "radiochoix1"){ 
    temps = 60;
    tempsMax = 60;
    timerCB();
    intervalTimer = setInterval(timerCB, 1000);
  }

  // Choix 2 = Temps 120 secondes
  if(radioChoix == "radiochoix2"){ 
    temps = 120;
    tempsMax = 120;
    timerCB();
    intervalTimer = setInterval(timerCB, 1000);
  }

  // Choix 3 = Nombre 20 questions
  if(radioChoix == "radiochoix3"){
    temps = 0;
    tempsMax = 0;
    
    modeQuestions = 1;
    nbQuestionsMax = 20;
   
    timerCB_count();
    intervalTimer = setInterval(timerCB_count, 1000);
  }

    // Choix 4 = Nombre 50 questions
    if(radioChoix == "radiochoix4"){
      temps = 0;
      tempsMax = 0;
      
      modeQuestions = 1;
      nbQuestionsMax = 50;
      
      timerCB_count();
      intervalTimer = setInterval(timerCB_count, 1000);
    }

  score = 0;
  erreurs = 0;
  nbQuestions ++; // Question 1

  document.getElementById("goFenetre").style.display = "none";
  document.getElementById("jeuFenetre").style.display = "block";
  document.getElementById("testTable").style.display = "none";

  // Mode Questions
  if(modeQuestions == 1){
    let timerBarrePourcentage = Math.round(100*100*(nbQuestions-1)/nbQuestionsMax)/100;
    document.getElementById("timerBarre").style.width = timerBarrePourcentage + "%";
    document.getElementById("scoreText").innerText = "Question #" + nbQuestions;
  }

  molNb = newMolAleatoire(nombreTotalMol, molNb);
  propalsTest = propositions(nombreTotalMol, molNb);
  document.getElementById("choix1").textContent = propalsTest[0];
  document.getElementById("choix2").textContent = propalsTest[1];
  document.getElementById("choix3").textContent = propalsTest[2];
  document.getElementById("choix4").textContent = propalsTest[3];
  document.getElementById("mol_img").src = "./molpng2/" + dataCB[molNb][0] + ".png";
}

// ##### //

function sequenceFin() {
  document.getElementById("choix1").disabled = true;
  document.getElementById("choix2").disabled = true;
  document.getElementById("choix3").disabled = true;
  document.getElementById("choix4").disabled = true;

  timerElement.innerText = "-";
  clearInterval(intervalTimer);

  scorePercent = Math.floor(100*(score/(score+erreurs))) + "%";

  document.getElementById("affichageScoreFin").textContent = score;
  document.getElementById("affichageErreursFin").textContent = erreurs;
  document.getElementById("affichageBilanFin").textContent = scorePercent;
  
  if(modeQuestions == 1){
    temps--; // Correction de la seconde en trop
    document.getElementById("questionsTempsFin").textContent = "Time : " + parsingTemps(temps);
  }

  setHighscores(highscoresType, score, scorePercent, parsingTemps(temps));

  document.getElementById("jeuFenetre").classList.add("fade");

  setTimeout(function(){
    document.getElementById("jeuFenetre").style.display = "none";
    document.getElementById("finFenetre").style.display = "block";
    document.getElementById("finFenetre").style.opacity = 1;
    document.getElementById("playAgain").style.display = "block";
    molTableConstruction(molTableFin);}
  , 200);
}

// ##### //

function verificationReponse(){
  // Verification si bonne ou mauvaise reponse :
  
  if(dataCB[molNb][3] == this.textContent) {
    score += 1;
    if(modeQuestions == 0){
      document.getElementById("affichageScore").textContent = score;
    }
    molTableFin.push(new molTable(nbQuestions, "./molpng2/" + dataCB[molNb][0] + ".png", this.textContent, dataCB[molNb][3], 1));
  }else{
    erreurs +=1;
    molTableFin.push(new molTable(nbQuestions, "./molpng2/" + dataCB[molNb][0] + ".png", this.textContent, dataCB[molNb][3], 0));
  }

  nbQuestions ++; // Question +1

  if(modeQuestions == 1){
    let timerBarrePourcentage = Math.round(100*100*(nbQuestions-1)/nbQuestionsMax)/100;
    document.getElementById("timerBarre").style.width = timerBarrePourcentage + "%";
  }

  if(nbQuestions > nbQuestionsMax){

    sequenceFin();

  }else{
    
    // Mode Questions
    if(modeQuestions == 1){
      document.getElementById("scoreText").innerText = "Question #" + nbQuestions;
    }

    // Nouvelle molecule/question
    molNb = newMolAleatoire(nombreTotalMol, molNb);
    propalsTest = propositions(nombreTotalMol, molNb);
    document.getElementById("choix1").textContent = propalsTest[0];
    document.getElementById("choix2").textContent = propalsTest[1];
    document.getElementById("choix3").textContent = propalsTest[2];
    document.getElementById("choix4").textContent = propalsTest[3];
    document.getElementById("mol_img").src = "./molpng2/" + dataCB[molNb][0] + ".png";
  }
}




// ################################ //

// Definition des variables
let score = 0;
let erreurs = 0;
document.getElementById("affichageScore").textContent = score;

document.getElementById("go").onclick = initialisation;

document.getElementById("choix1").onclick = verificationReponse;
document.getElementById("choix2").onclick = verificationReponse;
document.getElementById("choix3").onclick = verificationReponse;
document.getElementById("choix4").onclick = verificationReponse;

// document.getElementById("testChangementRandom").onclick = verificationReponse;

// ################################ //

function rowStyle(row, index) {
  if(index == 0){
    return {classes:"border-dark border-2",
            css:{"background-color":"#c9b037", "color":"black", "font-weight":"bold"}}
  }

  if(index == 1){
    return {classes:"border-dark border-2",
            css:{"background-color":"#b4b4b4", "color":"black", "font-weight":"bold"}}
  }

  if(index == 2){
    return {classes:"border-dark border-2",
            css:{"background-color":"#ad8a56", "color":"black", "font-weight":"bold"}}
  }

  return {classes: "table-default bg-white border border-dark border-2"}
}

// ##### //

function headerStyle(column) {
  return {classes: "table-dark border-dark border-2"}
}

// ################################ //
// ################################ //

// Highscores

function getHighscores(localStorageNom) {
  let test = JSON.parse(window.localStorage.getItem(localStorageNom));

  if(test == null){
    document.getElementById("highscores").style.display = "none";
    document.getElementById("nohighscores").style.display = "inline";

    document.getElementById("nohighscores").textContent = "No highscores";
  }else{
    document.getElementById("highscores").style.display = "inline";
    document.getElementById("nohighscores").style.display = "none";

    $(function () {
      $('#highscores').bootstrapTable("destroy");
      $('#highscores').bootstrapTable({data: test});
      if(localStorageNom.substring(10,12) == "Nb"){
        $('#highscores').bootstrapTable('showColumn', 'Time');
      }
    });

  }
}

// ##### //

function setHighscores(localStorageNom, localStorageScore, localStorageScorePerc, localStorageTime) {
  let test = JSON.parse(window.localStorage.getItem(localStorageNom));

  if(test == null){
    test = [];
  }

  const date = new Date();
  let today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  test.push({"Score":localStorageScore, "Total":localStorageScorePerc, "Date":today, "Time":localStorageTime})
  // test.sort((a, b) => b.Score - a.Score)

  test.sort(function(a,b){
    if (a.Score===b.Score){
      if (a.Total===b.Total){
          return (b.Time-a.Time);
      } else if(a.Total<b.Total){
          return 1;
      } else if(a.Total>b.Total){
          return -1;
      }
    } else if(a.Score<b.Score){
       return 1;
    } else if(a.Score>b.Score){
       return -1;
    }
  });

  if(test.length > highscoresMax){
    test.pop();
  }
  
  window.localStorage.setItem(localStorageNom, JSON.stringify(test));
  getHighscores(localStorageNom)
}

// ##### //

function getHighscoresRadio(){
  radioChoix = document.querySelector('input[name=btnradio]:checked').value;
  getHighscores(localStorageDict[radioChoix]);
}

// ################################ //
// ################################ //





// ################################ //
// ################################ //