String.prototype.getFormattedSearchQuery = function () {
  return this.toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};

String.prototype.getFormattedDataId = function () {
  return this.toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("%", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
};

export default String;
