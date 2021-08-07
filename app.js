/* ----- Les Variables ----- */
let taille = "";
let poids = "";
let yourImc = "";

/* ----- Les Sélecteurs ----- */
let inputTaille = document.querySelector("#inputTaille");
let inputPoids = document.querySelector("#inputPoids");
let btnCalc = document.querySelector("#btnCalc");
let textError = document.querySelector("#textError");

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
    element.classList.add("animation");

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

function addError(elError, elCorrect) {
    if (elError) {
        elError.classList.add("error");
    }
    if (elCorrect) {
        elCorrect.classList.remove("error");
    }
}

function checkImc(value) {
    let textImc = ""
    switch (true) {
        case value >= 40:
            textImc = "obésité morbide";
            break;
        case value >= 35:
            textImc = "obésité sévère";
            break;
        case value >= 30:
            textImc = "obésité modérée";
            break;
        case value >= 25:
            textImc = 'surpoids';
            break;
        case value >= 18.5:
            textImc = "poids normal";
            break;
        default:
            textImc = "maigreur";
    }
    return textImc;
}

// Prends les valeurs dans les inputs et les utilises dans la function imc
function inputImc() {
    taille = parseInt(inputTaille.value);
    poids = parseInt(inputPoids.value);

    yourImc = imc(taille, poids);

    switch (true) {
        case !taille && !poids:
            addText(textError, "Votre taille/poids ne sont pas définis", false);

            addError(inputTaille, null);
            addError(inputPoids, null);
            break;
        case !taille:
            addText(textError, "Votre taille n'est pas définie", false);

            addError(inputTaille, inputPoids);
            break;
        case !poids:
            addText(textError, "Votre poids n'est pas défini", false);

            addError(inputPoids, inputTaille);
            break;
        case yourImc > 61 || yourImc < 7:
            addText(textError, "L'imc est incorrect", false);

            addError(inputTaille, null);
            addError(inputPoids, null);

            break;
        default:
            addText(textError, "Votre Imc est de " + yourImc, true);
            textError.appendChild(document.createTextNode(` | ${checkImc(yourImc)}`));

            addError(null, inputTaille);
            addError(null, inputPoids);
    }
}

/* ----- Les Ecouteurs ----- */
btnCalc.addEventListener("click", (e) => {
    e.preventDefault();
    inputImc();
});
