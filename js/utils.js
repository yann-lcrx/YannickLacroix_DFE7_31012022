String.prototype.getFormattedSearchQuery = function () {
  return this.toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};

String.prototype.getFormattedClassName = function () {
  return this.toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("%", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
};

export default String;
