// ################################ //

// class molecule {
//   constructor(image, name1, name2){
//     this.image = image;
//     this.name1 = name1;
//     this.name2 = name2;
//   }
// }

// ################################ //

function nombreAleatoire(limite, nbPrecedent){
  let nbAleatoire = Math.floor(Math.random()*limite);
  
  while(nbPrecedent == nbAleatoire){
    console.log(nbAleatoire)
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

let tempsMax = 120;
let temps = null;
const timerElement = document.getElementById("timer");

// ##### //

function timerCB(){
  let minutes = parseInt(temps / 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes

  let secondes = parseInt(temps % 60, 10);
  secondes = secondes < 10 ? "0" + secondes : secondes

  timerElement.innerText = minutes + ":" + secondes;

  let timerBarrePourcentage = Math.round(100*100*temps/tempsMax)/100;

  document.getElementById("timerBarre").style.width = timerBarrePourcentage + "%";
  
  if(temps == 0){
    timerElement.innerText = "FINITO PIPO";
    clearInterval(intervalTimer);

    document.getElementById("affichageScoreFin").textContent = score;
    document.getElementById("affichageErreursFin").textContent = erreurs;
    document.getElementById("affichageBilanFin").textContent = Math.floor(100*(score/(score+erreurs))) + "%";
    
    document.getElementById("jeuFenetre").classList.add("fade");
    setTimeout(function(){document.getElementById("jeuFenetre").style.display = "none";document.getElementById("finFenetre").style.display = "block";document.getElementById("finFenetre").style.opacity = 1;}, 300);
    
  }

  temps --;
}

// ################################ //

function initialisation(){
  temps = tempsMax;
  score = 0;
  erreurs = 0;

  document.getElementById("goFenetre").style.display = "none";
  document.getElementById("jeuFenetre").style.display = "block";
  
  timerCB();
  intervalTimer = setInterval(timerCB, 1000);

  molNb = newMolAleatoire(nombreTotalMol, molNb);
  propalsTest = propositions(nombreTotalMol, molNb);
  document.getElementById("choix1").textContent = propalsTest[0];
  document.getElementById("choix2").textContent = propalsTest[1];
  document.getElementById("choix3").textContent = propalsTest[2];
  document.getElementById("choix4").textContent = propalsTest[3];

  document.getElementById("mol_img").src = "./molpng/" + dataCB[molNb][0] + ".png";
}



function testdisplayfunction(){
  
}


// ##### //

function testclick(){
  // Verification si bonne ou mauvaise reponse :

  if(dataCB[molNb][3] == this.textContent) {
    score += 1;
    document.getElementById("affichageScore").textContent = score;
    console.log("BONNE REPONSE, +1 !")
  }else{
    erreurs +=1;
    console.log("MAUVAISE REPONSE")
  }

  molNb = newMolAleatoire(nombreTotalMol, molNb);
  // document.getElementById("affichageScore").textContent = molNb;

  propalsTest = propositions(nombreTotalMol, molNb);
  document.getElementById("choix1").textContent = propalsTest[0];
  document.getElementById("choix2").textContent = propalsTest[1];
  document.getElementById("choix3").textContent = propalsTest[2];
  document.getElementById("choix4").textContent = propalsTest[3];

  document.getElementById("mol_img").src = "./molpng/" + dataCB[molNb][0] + ".png";

}

// ################################ //

// Definition des variables
let score = 0;
let erreurs = 0;
document.getElementById("affichageScore").textContent = score;

document.getElementById("go").onclick = initialisation;

document.getElementById("choix1").onclick = testclick;
document.getElementById("choix2").onclick = testclick;
document.getElementById("choix3").onclick = testclick;
document.getElementById("choix4").onclick = testclick;

// document.getElementById("testChangementRandom").onclick = testclick;

// ################################ //







// ################################ //
// ################################ //





// ################################ //
// ################################ //