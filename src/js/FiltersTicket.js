
const TicketFilters = {
  sortLowPrice(tickets) {
    return tickets.sort((a, b) => (a.price < b.price ? -1 : 1));
  },

  sortFastFly(tickets) {
    const durations = tickets.map((ticket) => ({
      id: ticket.id,
      totalDuration: ticket.segments.reduce((a, b) => a.duration + b.duration),
    }));

    return durations
      .sort((a, b) => (a.totalDuration < b.totalDuration ? -1 : 1))
      .map(({ id }) => tickets.find((ticket) => ticket.id === id));
  },
};


export default TicketFilters;
