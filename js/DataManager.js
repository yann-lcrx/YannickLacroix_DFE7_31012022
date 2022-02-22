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

  static getIngredients() {
    const ingredientList = [];
    for (let recipe of this.data.recipes) {
      for (let ingredient of recipe.ingredients)
        if (!ingredientList.includes(ingredient.ingredient)) {
          ingredientList.push(ingredient.ingredient);
        }
    }
    return ingredientList;
  }

  static getAppliances() {
    const applianceList = [];
    for (let recipe of this.data.recipes) {
      if (!applianceList.includes(recipe.appliance)) {
        applianceList.push(recipe.appliance);
      }
    }
    return applianceList;
  }

  static getUtensils() {
    const utensilList = [];
    for (let recipe of this.data.recipes) {
      for (let utensil of recipe.ustensils)
        if (!utensilList.includes(utensil)) {
          utensilList.push(utensil);
        }
    }
    return utensilList;
  }

  static getFormattedString(string) {
    return string
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  static getSearchResults(query) {
    const formattedString = query.getFormattedString();
    return [...this.getRecipes()].filter((recipe) => {
      return (
        recipe.name.getFormattedString().includes(formattedString) ||
        recipe.description.getFormattedString().includes(formattedString) ||
        recipe.ingredients
          .map((ingredient) =>
            Object.values(ingredient.ingredient.getFormattedString())
          )
          .includes(formattedString)
      );
    });
  }
}
