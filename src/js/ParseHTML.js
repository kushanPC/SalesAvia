
const ParseHTML = {
  getTickets(tickets) {
    return tickets.map(ParseHTML.getTicket).join('');
  },
  getTicket(ticket) {
    const { id, price, segments } = ticket;

    return `
      <li class="ticket" data-id="${id}">
        <div class="head-ticket">
          <div class="price">${price} P</div>
          <div class="carrier"></div>
        </div>
  
        ${segments.map((segment) => `
          <div class="segments">
            <div class="origin-destination">
              <span class="title">
                ${segment.origin}-${segment.destination}
              </span>
              <div class="flytime">${segment.date}</div>
            </div>
  
              <div class="time-way">
                <div class="title">в пути</div>
                <div class="duration">${segment.duration}</div>
              </div>
  
              <div class="transfer">
                <div class="title-transfer">${segment.stops.length} пересадки</div>
                <div class="transfer-country">
                  ${segment.stops.map((stop) => `
                    <span>${stop} </span>
                  `).join('')}
                </div>
              </div>
            </div>
        `).join('')}
      </li>
    `;
  },
};

export default ParseHTML;
