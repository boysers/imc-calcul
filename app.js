/* ----- Les Variables ----- */
let taille = "";
let poids = "";

/* ----- Les Sélecteurs ----- */
let inputTaille = document.querySelector("#inputTaille");
let inputPoids = document.querySelector("#inputPoids");
let btnCalc = document.querySelector("#btnCalc");
let userImc = document.querySelector("#userImc");

/* ----- Les Functions ----- */
// Calcul imc: t = taille en cm, p = poids en kg et n convertit la taille en mètre
function imc(t, p) {
    // Formule: Imc = Poids / Taille²
    let n = t / 100;
    let r = p / (n * n);
    return r.toFixed(1);
}

// Ajoute dans le html le résultat ou l'erreur si la valeur est vide
function addText(element, message, valeur) {
    let addHtml = "";

    // Regarde si valeur est vraie ou faux
    if (!valeur) {
        element.innerHTML = message ? message : "erreur";
        element.style.color = "#FF8080";
        element.style.background = "#290000";
    } else {
        element.innerHTML = message ? message + valeur : "Correct " + valeur;
        element.style.color = "";
        element.style.background = "";
    }
    return addHtml;
}

// Prends les valeurs dans les inputs et les utilises dans la function imc
function inputImc() {
    taille = parseInt(inputTaille.value);
    poids = parseInt(inputPoids.value);

    // Regarde si les valeurs sont vraie ou fausse
    // "                         " inferieur à 0
    if (!taille || !poids || taille < 0 || poids < 0) {
        inputTaille.value = "";
        inputPoids.value = "";

        // Ajout de null pour dire que la valeur est vide
        addText(userImc, "Taille ou poids invalide", null);
        return;
    }
    addText(userImc, "Votre imc est de ", imc(taille, poids));
}

/* ----- Les Ecouteurs ----- */
btnCalc.addEventListener("click", (e) => {
    e.preventDefault();
    inputImc();
});