import DataManager from "./DataManager.js";
import String from "./utils.js";

async function init() {
  await DataManager.loadJson("../data/recipes.json");
  displayResults(DataManager.getRecipes());
  document.querySelector("#search input").addEventListener("input", (event) => {
    displayResults(DataManager.getSearchResults(event.target.value));
    displayListItems(event.target.value);
    document.getElementById("selected-filters").innerHTML = "";
  });
  displayListItems("");

  for (let filterSelector of document.querySelectorAll('[role="combobox"]')) {
    filterSelector.addEventListener("click", function () {
      if (this.getAttribute("selected") !== "true") {
        for (let filter of document.querySelectorAll('[role="combobox"]')) {
          filter.setAttribute("selected", "false");

          filter.childNodes[3].setAttribute(
            "src",
            "../assets/svg/expand_more_white.svg"
          );
        }
        this.setAttribute("selected", "true");
        this.childNodes[3].setAttribute(
          "src",
          "../assets/svg/expand_less_white.svg"
        );
      } else {
        this.setAttribute("selected", "false");
        this.childNodes[3].setAttribute(
          "src",
          "../assets/svg/expand_more_white.svg"
        );
      }
    });
  }
}

function displayListItems(query) {
  let recipes = DataManager.getSearchResults(query);
  displayIngredientsList(recipes);
  displayAppliancesList(recipes);
  displayUtensilsList(recipes);
  setupListItemEvents(query);
}

function setupListItemEvents(query) {
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
        // setup chips close button
        document
          .querySelector(
            `.chip[data-id=${this.innerText.getFormattedDataId()}] img`
          )
          .addEventListener("click", (event) => {
            document
              .querySelector(
                `.chip[data-id=${this.innerText.getFormattedDataId()}]`
              )
              .remove();
            this.setAttribute("selected", "false");
            filterSearch(query);
            event.stopPropagation();
          });
      } else {
        document
          .querySelector(
            `.chip[data-id=${this.innerText.getFormattedDataId()}]`
          )
          .remove();
        this.setAttribute("selected", "false");
      }
      filterSearch(query);
    });
  }
}

function filterSearch(query) {
  let recipes = DataManager.getSearchResults(query);
  for (let chip of document.getElementsByClassName("chip")) {
    if (chip.classList.contains("chip-ingredients")) {
      recipes = recipes.filter((recipe) => {
        return recipe.ingredients
          .map((ingredient) => ingredient.ingredient)
          .includes(chip.innerText);
      });
    }
    if (chip.classList.contains("chip-appliances")) {
      recipes = recipes.filter((recipe) => recipe.appliance === chip.innerText);
    }
    if (chip.classList.contains("chip-utensils")) {
      recipes = recipes.filter((recipe) =>
        recipe.ustensils.includes(chip.innerText)
      );
    }
  }
  displayResults(recipes);
  displayIngredientsList(recipes);
  displayAppliancesList(recipes);
  displayUtensilsList(recipes);
  setupListItemEvents(query);
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

function displayIngredientsList(recipes) {
  document.querySelector("#ingredients ul").innerHTML = "";
  let ingredientsDOM = "";
  for (let ingredient of DataManager.getIngredients(recipes)) {
    //keep track of active ingredients filters if there are any
    if (
      document.getElementById("selected-filters").innerHTML &&
      [...document.getElementsByClassName("chip-ingredients")]
        .map((chip) => chip.innerText)
        .includes(ingredient)
    ) {
      ingredientsDOM += `<li selected="true">${ingredient}</li>`;
    } else {
      ingredientsDOM += `<li>${ingredient}</li>`;
    }
  }
  document
    .querySelector("#ingredients ul")
    .insertAdjacentHTML("afterbegin", ingredientsDOM);
}

function displayAppliancesList(recipes) {
  document.querySelector("#appliances ul").innerHTML = "";
  let appliancesDOM = "";
  for (let appliance of DataManager.getAppliances(recipes)) {
    //keep track of active appliances filters if there are any
    if (
      document.getElementById("selected-filters").innerHTML &&
      [...document.getElementsByClassName("chip-appliances")]
        .map((chip) => chip.innerText)
        .includes(appliance)
    ) {
      appliancesDOM += `<li selected="true">${appliance}</li>`;
    } else {
      appliancesDOM += `<li>${appliance}</li>`;
    }
  }
  document
    .querySelector("#appliances ul")
    .insertAdjacentHTML("afterbegin", appliancesDOM);
}

function displayUtensilsList(recipes) {
  document.querySelector("#utensils ul").innerHTML = "";
  let utensilsDOM = "";
  for (let utensil of DataManager.getUtensils(recipes)) {
    //keep track of active appliances filters if there are any
    if (
      document.getElementById("selected-filters").innerHTML &&
      [...document.getElementsByClassName("chip-utensils")]
        .map((chip) => chip.innerText)
        .includes(utensil)
    ) {
      utensilsDOM += `<li selected="true">${utensil}</li>`;
    } else {
      utensilsDOM += `<li>${utensil}</li>`;
    }
  }
  document
    .querySelector("#utensils ul")
    .insertAdjacentHTML("afterbegin", utensilsDOM);
}

init();
