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
