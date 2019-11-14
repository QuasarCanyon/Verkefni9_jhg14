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
        element.appendChild(document.createTextNode(children[i]));
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
    const objData = data.results;
    const container = document.querySelector('.results');
    empty(container);
    if (objData.length === 0) {
      displayError('Ekkert fyrirtæki fannst fyrir leitarstreng');
    }
    for (let i = 0; i < objData.length; i++) {
      const name = el('dd', objData[i].name);
      const kt = el('dd', objData[i].sn);
      const { active } = objData[i];
      const title = el('dt', 'Nafn');
      const ktTitle = el('dt', 'Kennitala');
      const addrTitle = el('dt', 'Heimilisfang');
      let dl;
      if (active === 1) {
        const address = el('dd', objData[i].address);
        dl = el('dl', title, name, ktTitle, kt, addrTitle, address);
      } else {
        dl = el('dl', title, name, ktTitle, kt);
      }
      const companyField = el('div', dl);
      if (active === 1) {
        companyField.setAttribute('class', 'company company--active');
      } else {
        companyField.setAttribute('class', 'company company--inactive');
      }
      container.appendChild(companyField);
    }
  }

  function displayError(error) {
    const container = document.querySelector('.results');
    empty(container);
    container.appendChild(document.createTextNode(error));
  }

  function loading() {
    const container = document.querySelector('.results');
    empty(container);
    const gif = el('img');
    gif.setAttribute('src', 'loading.gif');
    const text = el('dd', 'Leita að fyrirtækjum...');
    const div = el('div');
    div.setAttribute('class', 'loading');
    div.appendChild(gif);
    div.appendChild(text);
    container.appendChild(div);
  }

  async function fetchData(searchString) {
    loading();
    const result = await fetch(`${API_URL}${searchString}`);
    if (result.status < 200 || result.status >= 400) {
      displayError('Villa við að sækja gögn');
    } else {
      const data = await result.json();
      show(data);
    }
  }

  function getSearchString(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const search = input.value;
    if (search === '') {
      displayError('Lén verður að vera strengur');
    } else {
      input.setAttribute('placeholder', search);
      input.value = '';
      fetchData(search);
    }
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
