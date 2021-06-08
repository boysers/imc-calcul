/* ----- Les Variables ----- */
let taille = "";
let poids = "";
let yourImc = "";

/* ----- Les Sélecteurs ----- */
let inputTaille = document.querySelector("#inputTaille");
let inputPoids = document.querySelector("#inputPoids");
let btnCalc = document.querySelector("#btnCalc");
let userImc = document.querySelector("#userImc");

/* ----- Les Functions ----- */
// Calcul imc: t = taille en cm, p = poids en kg et m convertit la taille en mètre
function imc(t, p) {
    // Formule: Imc = Poids / Taille²(m)
    let m = t / 100;
    let r = p / (m * m);
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
        element.innerHTML = message ? message : "Correct";
        element.style.color = "";
        element.style.background = "";
    }
    return addHtml;
}

function addElError(elError, elCorrect) {
    if (elError) {
        elError.classList.add("error");
    }
    if (elCorrect) {
        elCorrect.classList.remove("error");
    }
}

// Prends les valeurs dans les inputs et les utilises dans la function imc
function inputImc() {
    taille = parseInt(inputTaille.value);
    poids = parseInt(inputPoids.value);

    yourImc = imc(taille, poids);

    switch (true) {
        case !taille && !poids:
            addText(userImc, "Taille et poids ne sont pas définis", false);

            addElError(inputTaille, null);
            addElError(inputPoids, null);
            break;
        case !taille:
            addText(userImc, "Taille n'est pas définie", false);

            addElError(inputTaille, inputPoids);
            break;
        case !poids:
            addText(userImc, "Poids n'est pas définie", false);

            addElError(inputPoids, inputTaille);
            break;
        case yourImc > 61 || yourImc < 7:
            addText(userImc, "L'imc est incorrect", false);

            addElError(inputTaille, undefined);
            addElError(inputPoids, undefined);

            break;
        default:
            addText(userImc, "Votre Imc est de " + yourImc, true);

            addElError(undefined, inputTaille);
            addElError(undefined, inputPoids);
    }
}

/* ----- Les Ecouteurs ----- */
btnCalc.addEventListener("click", (e) => {
    e.preventDefault();
    inputImc();
});
