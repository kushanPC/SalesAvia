const flightDuration = document.querySelectorAll('.duration');
const price = document.querySelectorAll('.price');
const flytime = document.querySelectorAll('.flytime');
const transferTitle = document.querySelectorAll('.title-transfer');
const stops = document.querySelectorAll('.transfer-country');
const segments = document.querySelectorAll('.segments');

function functionName2(timeWay) {
  return ((timeWay * 60) * 1000);
}

function functionName() {
  for (let i = 0; i < flytime.length; i += 1) {
    const flyDate = new Date(flytime[i].parentNode.parentNode.dataset.date).valueOf();
    flytime[i].parentNode.parentNode.dataset.flyDate = flyDate
    + functionName2(flightDuration[i].innerHTML);
  }
  for (let i = 0; i < segments.length; i += 2) {
    segments[i].parentNode.dataset.flyDate = segments[i].dataset.flyDate;
  }
}
functionName();

function flightTime(durationMinutes) {
  const minutes = durationMinutes;
  const duration = `${Math.trunc(minutes / 60)}ч ${minutes % 60}м`;
  return duration;
}

function flytimeInnerHtml(firstTime, secondTime) {
  const first = firstTime;
  const second = `${+secondTime.split('ч ')[0]}:${+secondTime.split('ч ')[1].replace('м', '')}`;
  const getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);

  let hours = ((+getDate(first).getHours() + +getDate(second).getHours()) % 24)
  + Math.trunc(((+getDate(first).getMinutes() + +getDate(second).getMinutes()) / 60));
  let minuts = (+getDate(first).getMinutes() + +getDate(second).getMinutes()) % 60;

  if (String(hours).length === 1) {
    hours = `0${String(hours)}`;
  }
  if (String(minuts).length === 1) {
    minuts = `0${String(minuts)}`;
  }
  return `${hours}:${minuts}`;
}

function timeDuration() {
  for (let i = 0; i < price.length; i += 1) {
    if (price[i].innerHTML.length === 6) {
      price[i].innerHTML = `${price[i].innerHTML.slice(0, 1)} ${price[i].innerHTML.slice(1, price.length)}`;
    }
    if (price[i].innerHTML.length === 7 && price[i].innerHTML[1] !== ' ') {
      price[i].innerHTML = `${price[i].innerHTML.slice(0, 2)} ${price[i].innerHTML.slice(2, price.length)}`;
    }
    if (price[i].innerHTML.length === 8 && price[i].innerHTML[2] !== ' ') {
      price[i].innerHTML = `${price[i].innerHTML.slice(0, 3)} ${price[i].innerHTML.slice(3, price.length)}`;
    }
  }

  for (let i = 0; i < flightDuration.length; i += 1) {
    flytime[i].innerHTML = flytime[i].innerHTML.split('T')[1].slice(0, 5);
    flightDuration[i].innerHTML = flightTime(flightDuration[i].innerHTML);
    flytime[i].innerHTML += ` - ${flytimeInnerHtml(flytime[i].innerHTML, flightDuration[i].innerHTML)}`;

    if (+transferTitle[i].innerHTML.slice(0, 2) === 0) {
      transferTitle[i].innerHTML = 'Без пересадок';
      stops[i].innerHTML = 'Без пересадок';
      stops[i].style.fontSize = '1.2vw';
    } if (+transferTitle[i].innerHTML.slice(0, 2) === 1) {
      transferTitle[i].innerHTML = '1 пересадка';
    }
  }
}
timeDuration();
