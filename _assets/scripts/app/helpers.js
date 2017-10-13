function cE(type, classes = '') {
  let element = document.createElement(type);

  element.classList = classes;

  return element;
}
