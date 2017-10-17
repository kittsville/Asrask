#= require app/generator

class FormGenerator extends Generator {
  textInput(id, labelText) {
    let wrapper = cE('div', 'mdl-textfield mdl-js-textfield'),
    input = cE('input', 'mdl-textfield__input'),
    label = cE('label', 'mdl-textfield__label');

    input.id = id;
    input.type = 'text';

    label.for = id;
    label.textContent = labelText;

    wrapper.inputField = input;

    wrapper.appendChild(input);
    wrapper.appendChild(label);

    return wrapper;
  }
}
