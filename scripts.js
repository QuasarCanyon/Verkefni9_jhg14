const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companiesSection;

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

  function fetchData(searchString) {
    debugger;
    fetch(API_URL + searchString)
      .then((response) => {
        if (response.ok) {
          debugger;
          return response.json();
        }
        debugger;
        throw Error('Villa!');
      })
      .then((jsonResponse) => {
        debugger;
        show(jsonResponse);
      })
      .catch((err) => console.error('Upp kom villa!', err));
  }

  function getSearchString(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');

    // TODO - Leysa úr því hvað gerist með tóman streng

    const search = input.value;
    if (search === '') {
      return;
    }
    input.setAttribute('placeholder', search);
    input.value = '';
    fetchData(search);
  }

  function init(companies) {
    companiesSection = companies;
    const search = companiesSection.querySelector('form');
    search.addEventListener('submit', getSearchString);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('.search');
  program.init(companies);
});
