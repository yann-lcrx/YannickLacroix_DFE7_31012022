/**
 * Fetches and serves data
 */
class DataManager {
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
    const formattedString = this.getFormattedString(query);
    return [...this.getRecipes()].filter((recipe) => {
      return (
        this.getFormattedString(recipe.name).includes(formattedString) ||
        this.getFormattedString(recipe.description).includes(formattedString) ||
        recipe.ingredients
          .map((ingredient) =>
            Object.values(this.getFormattedString(ingredient.ingredient))
          )
          .includes(formattedString)
      );
    });
  }
}
