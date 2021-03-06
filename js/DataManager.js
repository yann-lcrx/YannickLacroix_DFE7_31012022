import String from "./utils.js";

/**
 * Fetches and serves data
 */

export default class DataManager {
  static data = null;

  static async loadJson(file) {
    if (this.data === null) {
      try {
        this.data = await (await fetch(file)).json();
      } catch (err) {
        const errMessage = new ErrorManager(err);
        document.getElementById("main").innerHTML +=
          errMessage.getErrorMessageDOM();
      }
    }
  }

  static getRecipes() {
    return this.data.recipes;
  }

  static getIngredients(recipes) {
    const ingredientList = [];
    for (let recipe of recipes) {
      for (let ingredient of recipe.ingredients)
        if (!ingredientList.includes(ingredient.ingredient)) {
          ingredientList.push(ingredient.ingredient);
        }
    }
    return ingredientList;
  }

  static getAppliances(recipes) {
    const applianceList = [];
    for (let recipe of recipes) {
      if (!applianceList.includes(recipe.appliance)) {
        applianceList.push(recipe.appliance);
      }
    }
    return applianceList;
  }

  static getUtensils(recipes) {
    const utensilList = [];
    for (let recipe of recipes) {
      for (let utensil of recipe.ustensils)
        if (!utensilList.includes(utensil)) {
          utensilList.push(utensil);
        }
    }
    return utensilList;
  }

  static getSearchResults(query) {
    if (query.length > 2) {
      const formattedString = query
        .getFormattedSearchQuery()
        .replaceAll(",", "");
      const matchedRecipes = [];
      for (let recipe of this.getRecipes()) {
        let ingredientsList = "";
        for (let ingredient of recipe.ingredients) {
          ingredientsList += `${ingredient.ingredient}, `;
        }
        if (
          recipe.name.getFormattedSearchQuery().includes(formattedString) ||
          recipe.description
            .getFormattedSearchQuery()
            .includes(formattedString) ||
          ingredientsList.getFormattedSearchQuery().includes(formattedString)
        ) {
          matchedRecipes.push(recipe);
        }
      }
      return matchedRecipes;
    } else return this.getRecipes();
  }
}
