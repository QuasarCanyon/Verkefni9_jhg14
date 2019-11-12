const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companiesSection;

  function init(companies) {
    companiesSection = companies;
  }

  function fetch() {
    fetch(API_URL + searchString)
      .then(response => {
        if (!return.ok) {
          throw Error("Villa!");
        }
        return response.json();
      })
      .then(jsonResponse => {
        show(jsonResponse);
      })
      .catch(err => console.error("Upp kom villa!", err));
  }

  function show() {

  }

  function el(type, className, clickHandler) {
    let newEl = null;
    // Todo -- Laga að þeim elementum sem á að búa til hér
    if (type === 'checkbox') {
      newEl = document.createElement('input');
      newEl.setAttribute('type', type);
    } else {
      newEl = document.createElement(type);
    }
    
    newEl.setAttribute('class', className);

    if (clickHandler === commit) {
      newEl.addEventListener('keydown', clickHandler);
    } else {
      newEl.addEventListener('click', clickHandler);
    }

    return newEl;
  }

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('form');
  program.init(companies);
});
