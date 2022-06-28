// ################################ //

document.getElementById("testTable").style.display = "none";

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
  document.getElementById("testTable").style.display = "flex";
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
    //console.log(nbAleatoire)
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
const timerElement = document.getElementById("timer");

// ##### //

function timerCB(){
  timerElement.innerText = parsingTemps(temps);

  let timerBarrePourcentage = Math.round(100*100*temps/tempsMax)/100;

  document.getElementById("timerBarre").style.width = timerBarrePourcentage + "%";
  
  if(temps == 0){
    timerElement.innerText = "FINITO PIPO";
    clearInterval(intervalTimer);
    molTableConstruction(molTableFin);

    document.getElementById("affichageScoreFin").textContent = score;
    document.getElementById("affichageErreursFin").textContent = erreurs;
    document.getElementById("affichageBilanFin").textContent = Math.floor(100*(score/(score+erreurs))) + "%";
    
    document.getElementById("jeuFenetre").classList.add("fade");
    setTimeout(function(){document.getElementById("jeuFenetre").style.display = "none";document.getElementById("finFenetre").style.display = "block";document.getElementById("finFenetre").style.opacity = 1;}, 300);
    
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
  let radioChoix = document.querySelector('input[name=btnradio]:checked').value;
  
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
    clearInterval(intervalTimer);
    molTableConstruction(molTableFin);

    document.getElementById("affichageScoreFin").textContent = score;
    document.getElementById("affichageErreursFin").textContent = erreurs;
    document.getElementById("affichageBilanFin").textContent = Math.floor(100*(score/(score+erreurs))) + "%";
    
    temps--; // Correction de la seconde en trop
    document.getElementById("questionsTempsFin").textContent = "Temps : " + parsingTemps(temps);
    
    document.getElementById("jeuFenetre").classList.add("fade");
    setTimeout(function(){document.getElementById("jeuFenetre").style.display = "none";document.getElementById("finFenetre").style.display = "block";document.getElementById("finFenetre").style.opacity = 1;}, 300);

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







// ################################ //
// ################################ //





// ################################ //
// ################################ //
