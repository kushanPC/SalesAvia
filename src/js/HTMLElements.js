export default {
  tabs: document.querySelector('.tabs'),
  ticketList: document.getElementById('ticket-list'),
};

export const setHTML = (element, domString) => {
  const el = element;
  el.innerHTML = domString;
};
