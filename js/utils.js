String.prototype.getFormattedString = function () {
  return this.toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};

export default String;
