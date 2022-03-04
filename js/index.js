import DataManager from "./DataManager.js";
import String from "./utils.js";

async function init() {
  await DataManager.loadJson("../data/recipes.json");
  displayResults(DataManager.getRecipes());
  document.querySelector("#search input").addEventListener("input", (event) => {
    if (event.target.value.length > 2) {
      displayResults(DataManager.getSearchResults(event.target.value));
    } else {
      displayResults(DataManager.getRecipes());
    }
  });
  displayIngredientsList();
  displayAppliancesList();
  displayUtensilsList();

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
      if (this.getAttribute("selected") !== "true") {
        document
          .getElementById("selected-filters")
          .insertAdjacentHTML(
            "beforeend",
            `<div class="chip chip-${
              this.parentElement.parentElement.id
            }" data-id=${this.innerText.getFormattedDataId()}>${
              this.innerText
            } <img src="/assets/svg/cancel_white.svg" alt="supprimer le filtre" /></div>`
          );
        document
          .querySelector(
            `.chip[data-id=${this.innerText.getFormattedDataId()}] img`
          )
          .addEventListener("click", () => {
            document
              .querySelector(
                `.chip[data-id=${this.innerText.getFormattedDataId()}]`
              )
              .remove();
            this.setAttribute("selected", "true");
          });
        this.setAttribute("selected", "true");
      } else {
        document
          .querySelector(
            `.chip[data-id=${this.innerText.getFormattedDataId()}]`
          )
          .remove();
        this.setAttribute("selected", "false");
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

function displayIngredientsList() {
  let ingredientsDOM = "";
  for (let ingredient of DataManager.getIngredients()) {
    ingredientsDOM += `<li>${ingredient}</li>`;
  }
  document
    .querySelector("#ingredients ul")
    .insertAdjacentHTML("afterbegin", ingredientsDOM);
}

function displayAppliancesList() {
  let appliancesDOM = "";
  for (let appliance of DataManager.getAppliances()) {
    appliancesDOM += `<li>${appliance}</li>`;
  }
  document
    .querySelector("#appliances ul")
    .insertAdjacentHTML("afterbegin", appliancesDOM);
}

function displayUtensilsList() {
  let utensilsDOM = "";
  for (let utensil of DataManager.getUtensils()) {
    utensilsDOM += `<li>${utensil}</li>`;
  }
  document
    .querySelector("#utensils ul")
    .insertAdjacentHTML("afterbegin", utensilsDOM);
}

init();

//autre classe pour les filtres par tag
//les filtres doivent être ceux des résultats de la recherche principale (ingrédients, ustensils...)
//dataset plutôt que classe pour les tags
// I/O et affichage de l'algorigramme
