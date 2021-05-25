function calcImc() {
  const userPoids = document.getElementById("userPoids");
  const userSize = document.getElementById("userSize");
  const button = document.getElementById("ajouter");
  const imc = document.getElementById("imc");
  const page = document.getElementById("page");
  const form = document.getElementById("form");

  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (userPoids.value == "" || userSize.value == "") {
      const popup = document.getElementById("pagePopup");
      popup.className = "showPopup";
      let height = form.offsetHeight;
      let width = form.offsetWidth;
      height += 2;
      width += 2;
      const hauteur = height + "px";
      const largeur = width + "px";
      popup.style.height = hauteur;
      popup.style.width = largeur;

      const ok = document.getElementById("ok");

      ok.addEventListener("mouseenter", function (e) {
        popup.style.border = "2px solid #f74857";
      });

      ok.addEventListener("mouseleave", function (e) {
        popup.style.border = "2px solid #ec969e";
      });

      ok.addEventListener("click", function (e) {
        e.preventDefault();
        popup.className = "popup";
      });
    } else {
      const devUserPoids = userPoids.value;
      const devUserSize = userSize.value;
      const decimalDevUserSize = devUserSize / 100;
      const squaredDevUserSize = decimalDevUserSize * decimalDevUserSize;
      const userImc = devUserPoids / squaredDevUserSize;
      const decimalUserImc = userImc.toFixed(1);
      imc.innerText = decimalUserImc;

      imc.classList = "focusImc";
      setTimeout(() => {
        imc.classList = "setTimeOut";
      }, 2000);

      const date = new Date();
      const dateLocal = date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
      });

      localStorage.setItem("storageImc", JSON.stringify(decimalUserImc));
      localStorage.setItem("storageSize", JSON.stringify(devUserSize));
      localStorage.setItem("storagePoids", JSON.stringify(devUserPoids));
      localStorage.setItem("storageDate", JSON.stringify(dateLocal));

      history();
    }
  });

  button.addEventListener("mouseenter", function (e) {
    page.style.border = "2px solid #f74857";
    localStorageClear.style.backgroundColor = "#f74857";
    localStorageClear.style.color = "#fff";
  });

  button.addEventListener("mouseleave", function (e) {
    page.style.border = "2px solid #ec969e";
    localStorageClear.style.backgroundColor = "#ec969e";
    localStorageClear.style.color = "#000";
  });
}

function history() {
  //JSON
  const storageImc = JSON.parse(localStorage.getItem("storageImc"));

  const storageSize = JSON.parse(localStorage.getItem("storageSize"));
  userSize.value = storageSize;

  const storagePoids = JSON.parse(localStorage.getItem("storagePoids"));

  //Date
  const storageDate = JSON.parse(localStorage.getItem("storageDate"));
  function date() {
    if (storageDate == undefined) {
      const nullStorageSize = "aucune donnée";
      lastDate.innerText = nullStorageSize;
    } else {
      const convertDate = storageDate;
      lastDate.innerText = convertDate;
    }
  }

  //Taille
  const lastSize = document.getElementById("lastSize");
  function convertSize() {
    if (storageSize == undefined) {
      let nullStorageSize = storageSize;
      nullStorageSize = "";
      lastSize.innerText = nullStorageSize;
    } else {
      const convertSize = storageSize / 100;
      lastSize.innerText = convertSize + "m";
    }
  }

  //Poids
  const lastPoids = document.getElementById("lastPoids");
  function convertPoids() {
    if (storagePoids == null) {
      let nullStoragePoids = storagePoids;
      nullStoragePoids = "";
      lastPoids.innerText = nullStoragePoids;
    } else {
      const convertPoids = storagePoids;
      lastPoids.innerText = convertPoids + "kg";
    }
  }

  //IMC
  const lastImc = document.getElementById("lastImc");
  function convertImc() {
    if (storageImc == null) {
      let nullstorageImc = storageImc;
      nullstorageImc = "";
      lastImc.innerText = nullstorageImc;
    } else {
      const convertImc = storageImc;
      if (convertImc >= 60) {
        lastImc.classList = "abuse";
        lastImc.innerText = convertImc;
      } else if (convertImc >= 35) {
        lastImc.classList = "obesiteSevere";
        lastImc.innerText = convertImc;
      } else if (convertImc >= 30) {
        lastImc.classList = "obesite";
        lastImc.innerText = convertImc;
      } else if (convertImc >= 25) {
        lastImc.classList = "surpoids";
        lastImc.innerText = convertImc;
      } else if (convertImc >= 18.5) {
        lastImc.classList = "normal";
        lastImc.innerText = convertImc;
      } else {
        lastImc.classList = "sousPoids";
        lastImc.innerText = convertImc;
      }
    }
  }

  date();
  convertPoids();
  convertSize();
  convertImc();
}

calcImc();
history();

const localStorageClear = document.getElementById("delete");
localStorageClear.addEventListener("click", function (e) {
  localStorage.clear();
  location.reload();
});

function clearApp() {
  localStorageClear.addEventListener("mouseenter", function (e) {
    page.style.border = "2px solid #f74857";
    localStorageClear.style.backgroundColor = "#f74857";
    localStorageClear.style.color = "#fff";
  });

  localStorageClear.addEventListener("mouseleave", function (e) {
    page.style.border = "2px solid #ec969e";
    localStorageClear.style.backgroundColor = "#ec969e";
    localStorageClear.style.color = "#000";
  });
}

clearApp();
