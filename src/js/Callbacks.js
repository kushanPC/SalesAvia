import tickets from './Tickets';
import ParseHTML from './ParseHTML';
import FiltersTicket from './FiltersTicket';
import HTMLElements, { setHTML } from './HTMLElements';


const Callbacks = {
  onClickTabs(e) {
    const { button } = e.target.dataset;

    if (!button) {
      return;
    }

    switch (button) {
      case 'cheap': {
        setHTML(
          HTMLElements.ticketList,
          ParseHTML.getTickets(FiltersTicket.sortLowPrice(tickets)),
        );
        break;
      }

      case 'fast': {
        setHTML(
          HTMLElements.ticketList,
          ParseHTML.getTickets(FiltersTicket.sortFastFly(tickets)),
        );
        break;
      }

      default: {
        break;
      }
    }
  },
};


export default Callbacks;
