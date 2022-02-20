import DataManager from "./DataManager.js";

async function init() {
  await DataManager.loadJson("../data/recipes.json");
  document.querySelector("#search input").addEventListener("input", (event) => {
    if (event.target.value.length > 2) {
      displayResults(DataManager.getSearchResults(event.target.value));
    }
  });
  for (let filterSelector of document.querySelectorAll('[role="combobox"]')) {
    filterSelector.addEventListener("click", function () {
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
        this.childNodes[3].setAttribute(
          "src",
          "../assets/svg/expand_more_white.svg"
        );
      } else {
        this.classList.add("selected");
        this.childNodes[3].setAttribute(
          "src",
          "../assets/svg/expand_less_white.svg"
        );
      }
    });
  }

  for (let listItem of document.querySelectorAll('[role="listbox"] li')) {
    listItem.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
        document
          .getElementById("selected-filters")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="chip chip-${this.innerText} chip-${this.parentElement.parentElement.id}">${this.innerText} <img src="/assets/svg/cancel_white.svg" alt="supprimer le filtre" /></div>`
          );
        document
          .querySelector(`.chip-${this.innerText} img`)
          .addEventListener("click", () => {
            document.querySelector(`.chip-${this.innerText}`).remove();
            this.classList.remove("selected");
          });
        this.classList.add("selected");
      } else {
        document.querySelector(`.chip-${this.innerText}`).remove();
        this.classList.remove("selected");
      }
    });
  }
}

function displayResults(results) {
  document.getElementById("results").innerHTML = "";
  let resultsDOM = "";
  for (let result of results) {
    resultsDOM += `
      <article class="card">
        <div class="placeholder-img"></div>
        <div class="card-info">
          <header>
            <p>${result.name}</p>
            <p class="duration-text">${result.time} min</p>
          </header>
          <div class="card-body">
            <ul>
              ${result.ingredients
                .map(
                  (ingredient) => `
              <li><span class="ingredient">${ingredient.ingredient}${
                    ingredient.quantity
                      ? ": </span>" + ingredient.quantity
                      : "</span>"
                  } ${ingredient.unit ? ingredient.unit : ""}</li>
            `
                )
                .join("")}
            </ul>
            <p>
              ${result.description}
            </p>
          </div>
        </div>
      </article>
    `;
  }
  document
    .getElementById("results")
    .insertAdjacentHTML("afterbegin", resultsDOM);
}

init();

//autre classe pour les filtres par tag
