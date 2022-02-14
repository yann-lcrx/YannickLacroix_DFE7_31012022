document.querySelector("#search input").addEventListener("input", (event) => {
  if (event.target.value.length > 2) {
    displayResults(getSearchResults(event.target.value));
  }
});

//includes, indexOf
function getSearchResults(string) {
  const lowerCaseString = string.toLowerCase();
  const formattedString = lowerCaseString
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
  return [...recipes].filter((recipe) => {
    return (
      recipe.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(formattedString) ||
      recipe.description
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(formattedString) ||
      recipe.ingredients
        .map((ingredient) =>
          Object.values(
            ingredient.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
          )
        )
        .includes(formattedString)
    );
  });
}

/* 
let string = "Hello World";

let search = "Hello";

console.log(string.toLowerCase().includes(search.toLowerCase()))

let stringWithAccents = "Phénomène"

console.log(stringWithAccents.normalize("NFD").replace(/\p{Diacritic}/gu,""))
*/

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

//classe pour gérer la recherche, qui enregistre la liste de base et celle triée. Qui gère les données et le filtre de la recherche principale
//autre classe pour les filtres par tag
//JSdoc pour POO
