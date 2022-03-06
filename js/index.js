import DataManager from "./DataManager.js";
import String from "./utils.js";

async function init() {
  await DataManager.loadJson("../data/recipes.json");
  displayResults(DataManager.getRecipes());
  document.querySelector("#search input").addEventListener("input", (event) => {
    displayResults(DataManager.getSearchResults(event.target.value));
    displayListItems(event.target.value);
  });
  displayListItems("");

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
}

function displayListItems(query) {
  displayIngredientsList(query);
  displayAppliancesList(query);
  displayUtensilsList(query);
  setupListItemEvents();
  document.getElementById("selected-filters").innerHTML = "";
}

function setupListItemEvents() {
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
            this.setAttribute("selected", "false");
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

function displayIngredientsList(query) {
  document.querySelector("#ingredients ul").innerHTML = "";
  let ingredientsDOM = "";
  for (let ingredient of DataManager.getIngredients(query)) {
    ingredientsDOM += `<li>${ingredient}</li>`;
  }
  document
    .querySelector("#ingredients ul")
    .insertAdjacentHTML("afterbegin", ingredientsDOM);
}

function displayAppliancesList(query) {
  document.querySelector("#appliances ul").innerHTML = "";
  let appliancesDOM = "";
  for (let appliance of DataManager.getAppliances(query)) {
    appliancesDOM += `<li>${appliance}</li>`;
  }
  document
    .querySelector("#appliances ul")
    .insertAdjacentHTML("afterbegin", appliancesDOM);
}

function displayUtensilsList(query) {
  document.querySelector("#utensils ul").innerHTML = "";
  let utensilsDOM = "";
  for (let utensil of DataManager.getUtensils(query)) {
    utensilsDOM += `<li>${utensil}</li>`;
  }
  document
    .querySelector("#utensils ul")
    .insertAdjacentHTML("afterbegin", utensilsDOM);
}

init();

//autre classe pour les filtres par tag
//les filtres doivent être ceux des résultats de la recherche principale (ingrédients, ustensils...)
