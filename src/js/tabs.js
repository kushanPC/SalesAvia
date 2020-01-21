const tabs = document.querySelector('.tabs');
const battons = document.querySelectorAll('.tab');
const list = document.getElementById('ticket-list');
const listElements = list.getElementsByTagName('LI');

function sortListCheap() {
  let i;
  let switching;
  let shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (listElements.length - 1); i += 1) {
      shouldSwitch = false;

      if (+listElements[i].value > +listElements[i + 1].value) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      listElements[i].parentNode.insertBefore(listElements[i + 1], listElements[i]);
      switching = true;
    }
  }
}

function sortListTime() {
  let i;
  let switching;
  let shouldSwitch;
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (listElements.length - 1); i += 1) {
      shouldSwitch = false;

      if (listElements[i].dataset.flyDate > listElements[i + 1].dataset.flyDate) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      listElements[i].parentNode.insertBefore(listElements[i + 1], listElements[i]);
      switching = true;
    }
  }
}

function onClickTab(event) {
  const button = event.target;
  if (button.className !== 'selected') {
    battons.forEach((element) => {
      const elem = element;
      elem.classList.remove('selected');
    });
    button.classList.add('selected');
    if (button.dataset.button === 'cheap') {
      sortListCheap();
      return;
    }
    sortListTime();
  }
}

tabs.addEventListener('click', onClickTab);

window.onload = () => {
  sortListCheap();
};
