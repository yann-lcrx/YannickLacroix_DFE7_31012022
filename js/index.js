document.querySelector("#search input").addEventListener("input", (event) => {
  if (event.target.value.length > 2) {
    displayResults(getSearchResults(event.target.value));
  }
});

function getSearchResults(string) {
  return [...recipes].filter((recipe) => {
    return (
      recipe.name.includes(string) ||
      recipe.description.includes(string) ||
      recipe.ingredients
        .map((ingredient) => Object.values(ingredient.ingredient))
        .includes(string)
    );
  });
}

function displayResults(results) {
  document.getElementById("results").innerHTML = "";
  let index = 0;
  for (let result of results) {
    document.getElementById("results").innerHTML += `
      <article class="card">
        <div class="placeholder-img"></div>
        <div class="card-info">
          <header>
            <p>${result.name}</p>
            <p class="duration-text">${result.time} min</p>
          </header>
          <div class="card-body">
            <ul></ul>
            <p>
              ${result.description}
            </p>
          </div>
        </div>
      </article>
    `;
    for (let ingredient of result.ingredients) {
      document.querySelectorAll(".card-body ul")[index].innerHTML += `
        <li>${ingredient.ingredient}${
        ingredient.quantity ? ": " + ingredient.quantity : ""
      } ${ingredient.unit ? ingredient.unit : ""}</li>
      `;
    }
    index++;
  }
}
