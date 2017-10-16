function cE(type, classes = null) {
  let element = document.createElement(type);

  if (classes) {
    element.classList = classes;
  }

  return element;
}
