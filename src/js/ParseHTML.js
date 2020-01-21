const ParseHTML = {
  getTickets(tickets) {
    return tickets.map(ParseHTML.getTicket).join('');
  },
  getPriceFormat(price) {
    const str = String(price);
    switch (str.length) {
      case 4:
        return `${str.slice(0, 1)} ${str.slice(1, str.length)}`;

      case 5:
        return `${str.slice(0, 2)} ${str.slice(2, str.length)}`;

      case 6:
        return `${str.slice(0, 3)} ${str.slice(3, str.length)}`;
      default: return price;
    }
  },
  durationToHours(segment) {
    return `${Math.trunc(segment.duration / 60)}ч ${segment.duration % 60}м`;
  },

  getTimeHM(dateDeparture) {
    const date = new Date(dateDeparture);
    const hours = `${date.getUTCHours()}`.length < 2 ? `0${date.getUTCHours()}` : date.getUTCHours();
    const minutes = `${date.getUTCMinutes()}`.length < 2 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
    return `${hours}:${minutes}`;
  },

  getArrivalDate(dateDeparture, duration) {
    const date = new Date(dateDeparture).setMilliseconds(duration * 60 * 1000);
    return date;
  },

  getStops(stops) {
    return stops.length ? stops.map((stop) => `
      <span>${stop} </span>
    `).join('') : 'Без пересадок';
  },

  getStopsNumber(stops) {
    switch (stops) {
      case +0:
        return 'Без пересадок';

      case +1:
        return `${stops} пересадка`;

      default:
        return `${stops} пересадки`;
    }
  },

  getTicket(ticket) {
    const { id, price, segments } = ticket;

    return `
      <li class="ticket" data-id="${id}">
        <div class="head-ticket">
          <div class="price">${ParseHTML.getPriceFormat(price)} P</div>
          <div class="carrier"></div>
        </div>

        ${segments.map((segment) => `
          <div class="segments">
            <div class="origin-destination">
              <span class="title">
                ${segment.origin}-${segment.destination}
              </span>
              <div class="flytime">${ParseHTML.getTimeHM(segment.date)}-
                ${ParseHTML.getTimeHM(ParseHTML.getArrivalDate(segment.date, segment.duration))}
              </div>
            </div>

              <div class="time-way">
                <div class="title">в пути</div>
                <div class="duration">${ParseHTML.durationToHours(segment)}</div>
              </div>

              <div class="transfer">
                <div class="title-transfer">${ParseHTML.getStopsNumber(segment.stops.length)}</div>
                <div class="transfer-country">
                  ${ParseHTML.getStops(segment.stops)}
                </div>
              </div>
            </div>
        `).join('')}
      </li>
    `;
  },

};


export default ParseHTML;
