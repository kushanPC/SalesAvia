import data from '../data.json';


const tickets = data.tickets.map((ticket, index) => ({
  ...ticket,
  id: index,
}));

export default tickets;
