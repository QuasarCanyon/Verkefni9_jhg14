const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {

  function el(name, ...children) {
    const element = document.createElement(name);
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] === 'string') {
        element.appendChild(element.createTextNode(children[i]));
      } else {
        element.appendChild(children[i]);
      }
    }
    return element;
  }

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function show(data) {
    if (data.length === 0) {
      displayError('Ekkert fyrirtæki fannst fyrir leitarstreng.');
      return;
    }
    
  }

  function fetch(searchString) {
    debugger;
    fetch(API_URL + searchString)
      .then((response) => {
        if (!response.ok) {
          throw Error('Villa!');
        }
        return response.json();
      })
      .then((jsonResponse) => {
        show(jsonResponse);
      })
      .catch((err) => console.error('Upp kom villa!', err));
  }

  function init(companies) {
    const companiesSection = companies;
    const search = companiesSection.target[0].value;
    companiesSection.addEventListener('submit', fetch(search));
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('form');
  program.init(companies);
});
