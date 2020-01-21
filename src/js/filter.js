const listItem = document.querySelectorAll('.ticket');
const noTicket = document.querySelector('.no-tickets');
const allCheckCheckbox = document.querySelector('.all-check-checkbox');
const checkbox = document.querySelectorAll('.checkbox');
const allCheck = document.querySelector('.all-check');

const withoutStops = document.querySelector('.without-stops');
const withoutStopsCheckbox = withoutStops.querySelector('.checkbox');

const oneStops = document.querySelector('.one-stops');
const oneStopsCheckbox = oneStops.querySelector('.checkbox');

const twoStops = document.querySelector('.two-stops');
const twoStopsCheckbox = twoStops.querySelector('.checkbox');

const threeStops = document.querySelector('.three-stops');
const threeStopsCheckbox = threeStops.querySelector('.checkbox');


function isClassHide() {
  return Array.prototype.every.call(listItem, (elem) => elem.className === 'ticket hide');
}

function noTickets() {
  if (isClassHide()) {
    noTicket.classList.remove('hide');
    noTicket.getElementsByTagName('h2')[0].innerHTML = `Мы нашли ${listItem.length} билетов. Но ни один не соответствует заданным фильтрам`;
  } else {
    noTicket.classList.add('hide');
  }
}

function filter() {
  const a = [withoutStopsCheckbox.checked, oneStopsCheckbox.checked,
    twoStopsCheckbox.checked, threeStopsCheckbox.checked];
  const b = [];
  a.forEach((element, i) => {
    if (element) {
      b.push(checkbox[i].parentNode.lastElementChild.innerHTML.slice(0, 1));
    }
  });
  listItem.forEach((element) => {
    element.classList.add('hide');
    const stops = element.querySelectorAll('.title-transfer');
    b.forEach((item) => {
      if (stops[0].innerHTML.slice(0, 1) === item) {
        b.forEach((i) => {
          if (stops[1].innerHTML.slice(0, 1) === i) {
            element.classList.remove('hide');
          }
        });
      }
    });
  });
  noTickets();
}

function onClickAllCheck() {
  if (allCheckCheckbox.checked) {
    checkbox.forEach((element) => {
      const elem = element;
      if (!elem.checked) {
        elem.checked = true;
      }
    });
  } else {
    checkbox.forEach((element) => {
      const elem = element;
      if (elem.checked) {
        elem.checked = false;
      }
    });
  }
  filter();
}

allCheck.addEventListener('click', onClickAllCheck);

withoutStops.addEventListener('click', filter);
oneStops.addEventListener('click', filter);
twoStops.addEventListener('click', filter);
threeStops.addEventListener('click', filter);
