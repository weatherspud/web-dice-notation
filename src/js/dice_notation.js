import { parser } from './parser.js';
import { roll } from './roll.js';

(function () {
  const render_form = function (url) {
    let dice = url.searchParams.get('dice');

    let form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', url.origin + url.pathname);

    let label = document.createElement('label');
    label.textContent = 'Dice Expression (e.g. 3d6):';
    form.appendChild(label);

    let input_dice = document.createElement('input');
    input_dice.setAttribute('name', 'dice');
    input_dice.setAttribute('type', 'text');
    input_dice.setAttribute('value', dice || '');
    form.appendChild(input_dice);

    let submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Roll');
    form.appendChild(submit);
    document.body.appendChild(form);
  };

  const render = function (url_string) {
    let url = new URL(url_string);
    let dice = url.searchParams.get('dice');

    if (dice) {
      let ast = parser.parse(dice);

      /*
      let debug = document.createElement('p');
      debug.textContent = JSON.stringify(ast);
      document.body.appendChild(debug);
      */

      let result = document.createElement('p');
      result.textContent = '' + roll(ast);
      document.body.appendChild(result);
    }

    render_form(url);
  };

  render(window.location.href);
})();
