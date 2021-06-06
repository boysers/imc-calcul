/* ----- Les Variables ----- */
// Utiliser pour la function inputImc
let taille = "";
let poids = "";

/* ----- Les Sélecteurs ----- */
let inputTaille = document.querySelector("#inputTaille");
let inputPoids = document.querySelector("#inputPoids");
let btnCalc = document.querySelector("#btnCalc");
let userImc = document.querySelector("#userImc");

/* ----- Les Ecouteurs ----- */
btnCalc.addEventListener("click", (e) => {
    e.preventDefault();
    inputImc();
});

/* ----- Les Functions ----- */
// Calcul imc: t = taille en cm, p = poids en kg et n convertit la taille en mètre
function imc(t, p) {
    // Formule: Imc = Poids / Taille²
    let n = t / 100;
    let r = p / (n * n);
    return r.toFixed(1);
}

// Ajoute dans le html le résultat ou l'erreur si la valeur est vide
function addText(variable, message, valeur) {
    let addHtml = "";

    // Regarde si valeur est vraie ou faux
    if (!valeur) {
        addHtml = {
            // Ajoute un texte par defaut si message et valeur sont null
            content: (variable.innerHTML = message ? message : "erreur"),
            // Ajoute du style à l'erreur
            color: (variable.style.color = "#FF8080"),
            background: (variable.style.background = "#290000"),
        };
    } else {
        addHtml = {
            // Ajoute la valeur et un texte par defaut si message est null
            content: (variable.innerHTML = message
                ? message + valeur
                : "Correct " + valeur),
            // Enleve le style de l'erreur
            color: (variable.style.color = ""),
            background: (variable.style.background = ""),
        };
    }
    return addHtml;
}

// Prends les valeurs dans les inputs et les utilises dans la function imc
function inputImc() {
    // Transforme les valeurs string des inputes en number
    taille = parseInt(inputTaille.value);
    poids = parseInt(inputPoids.value);

    // Regarde si les valeurs sont vraie ou fausse
    // "                         " inferieur à 0
    if (!taille || !poids || taille < 0 || poids < 0) {
        // Effaces les inputs
        inputTaille.value = "";
        inputPoids.value = "";

        // Ajout de null pour dire que la valeur est vide
        addText(userImc, "Taille ou poids invalide", null);
        return;
    }
    addText(userImc, "Votre imc est de ", imc(taille, poids));
}
