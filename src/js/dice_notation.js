import { parser } from './parser.js';
import { roll } from './roll.js';

const DEBUG = true;

(function () {
  const render_form = function (url) {
    let dice = url.searchParams.get('dice');

    let form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.setAttribute('action', url.origin + url.pathname);

    let label = document.createElement('label');
    label.textContent = 'Dice Notation (e.g. 3d6): ';
    form.appendChild(label);

    let input_dice = document.createElement('input');
    input_dice.setAttribute('name', 'dice');
    input_dice.setAttribute('size', 16);
    input_dice.setAttribute('type', 'text');
    input_dice.setAttribute('value', dice || '');
    form.appendChild(input_dice);

    document.body.appendChild(form);
  };

  const render = function (url_string) {
    let url = new URL(url_string);
    let dice = url.searchParams.get('dice');

    if (dice) {
      let result = document.createElement('p');
      let ast = null;

      try {
        ast = parser.parse(dice);
      } catch (e) {
        if (DEBUG) {
          result.textContent = 'could not parse: ' + dice + ': ' + e;
        } else {
          result.textContent = 'invalid dice notation: ' + dice;
        }
      }

      if (ast) {
        try {
          result.textContent = roll(ast);
        } catch (e) {
          if (DEBUG) {
            result.textContent = 'could not evaluate: ' + e;
          } else {
            result.textContent = 'error';
          }
        }
      }

      document.body.appendChild(result);
    }

    render_form(url);
  };

  render(window.location.href);
})();
