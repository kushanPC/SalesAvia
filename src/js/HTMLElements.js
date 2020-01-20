
export const setHTML = (element, domString) => {
  element.innerHTML = domString;
};

export default {
  tabs: document.querySelector('.tabs'),
  ticketList: document.getElementById('ticket-list'),
};
