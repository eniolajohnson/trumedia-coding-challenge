import { players, joshBell, bryceHarper, brandonCrawford } from './data';
import * as d3 from "d3";

const player1Img = document.querySelector('.player1 img');
const player1Name = document.querySelector('.player1 h3');
const player1Team = document.querySelector('.player1 p');
const player2Img = document.querySelector('.player2 img');
const player2Name = document.querySelector('.player2 h3');
const player2Team = document.querySelector('.player2 p');
const player3Img = document.querySelector('.player3 img');
const player3Name = document.querySelector('.player3 h3');
const player3Team = document.querySelector('.player3 p');

player1Img.setAttribute('src', `${players[0].playerImage}`);
player1Name.innerText = `${players[0].fullName}`;
player1Team.innerText = `${brandonCrawford[0].team}`;
player2Img.setAttribute('src', `${players[1].playerImage}`);
player2Name.innerText = `${players[1].fullName}`;
player2Team.innerText = `${bryceHarper[0].team}`;
player3Img.setAttribute('src', `${players[2].playerImage}`);
player3Name.innerText = `${players[2].fullName}`;
player3Team.innerText = `${joshBell[0].team}`;


const formatDate = (arr) => {
  arr.map(stats => {
    const date = new Date(stats.gameDate);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const newDate = day + " " + month;
    stats.newDate = newDate;
    stats.month = month;
    stats.year = year;
  })
  return arr;
}

const generate = (data, date) => {
  let key = {};
  let res = data.reduce(function (arr, v) {
    if (key.hasOwnProperty(v[`${date}`])) {
      arr[key[v[`${date}`]]].AB += Number(v.AB);
      arr[key[v[`${date}`]]].BB += Number(v.BB);
      arr[key[v[`${date}`]]].H += Number(v.H);
      arr[key[v[`${date}`]]].HBP += Number(v.HBP);
      arr[key[v[`${date}`]]].HR += Number(v.HR);
      arr[key[v[`${date}`]]].RBI += Number(v.RBI);
      arr[key[v[`${date}`]]].TB += Number(v.TB);
      arr[key[v[`${date}`]]].SF += Number(v.SF);
    } else {
      key[v[`${date}`]] = arr.length; // create index entry in key object
      arr.push({ // push the value
        [`${date}`]: v[`${date}`],
        'AB': Number(v.AB),
        'BB': Number(v.BB),
        'H': Number(v.H),
        'HBP': Number(v.HBP),
        'HR': Number(v.HR),
        'RBI': Number(v.RBI),
        'TB': Number(v.TB),
        'SF': Number(v.SF),
      })
    }
    return arr;
  }, [])
  const fullData = avgops(res);
  return fullData;
}

function avgops(arrR) {
  arrR.map(arr => {
    let one = (arr['BB'] + arr['HBP'] + arr['H']);
    let two = (arr['BB'] + arr['HBP'] + arr['SF'] + arr['AB']);
    let obp = Number((one / two).toFixed(3));
    let slg = Number((arr['TB'] / arr['AB']).toFixed(3));
    const resultOPS = obp + slg;
    arr.OBP = obp;
    arr.SLG = slg;
    arr.OPS = resultOPS;

    const resultAVG = (arr['H'] / arr['AB']).toFixed(3)
    arr.AVG = Number(resultAVG);
  })
  return arrR;
}

const constructor = (data) => {
  let labels = [];
  const obj1 = {};
  const obj2 = {};
  obj1.label = 'OPS',
    obj1.backgroundColor = "lightblue",
    obj1.borderColor = "rgba(208, 116, 60, 0.8)",
    obj1.fill = false,
    obj1.lineTension = 0,
    obj1.radius = 3,
    obj1.pointRadius = 3,
    obj2.label = 'AVG',
    obj2.borderDash = [5, 5]
    obj2.backgroundColor = "rgba(255, 140, 0, 1)",
    obj2.borderColor = 'transparent',
    obj2.fill = false,
    obj2.lineTension = 0,
    obj2.radius = 3,
    obj2.pointRadius = 3

  const dataArr = [];
  const dataArr2 = [];
  let datasets = [];
  datasets.push(obj1, obj2)
  let newData = data.map(item => {
    dataArr.push(item.OPS)
    dataArr2.push(item.AVG)
    labels.push(item.month)
    obj1.data = dataArr;
    obj2.data = dataArr2;
  })
  return { labels: labels, datasets: datasets }
}

let options = {
  responsive: true,
  legend: {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "white",
      fontSize: 16
    }
  }
};

formatDate(brandonCrawford);
formatDate(bryceHarper);
formatDate(joshBell);


const branData = generate(brandonCrawford, 'month');
const branChart = constructor(branData);

const bryceData = generate(bryceHarper, 'month');
const bryceChart = constructor(bryceData);

const joshData = generate(joshBell, 'month');
const joshChart = constructor(joshData);

const ctxBran = document.querySelector("#brandonChart").getContext('2d');
let chartBran = new Chart(ctxBran, {
  type: 'line',
  data: branChart,
  options: options
});

const ctxBryce = document.querySelector("#bryceChart").getContext('2d');
let chartBryce = new Chart(ctxBryce, {
  type: 'line',
  data: bryceChart,
  options: options
});

const ctxJosh = document.querySelector("#joshChart").getContext('2d');
let chartJosh = new Chart(ctxJosh, {
  type: 'line',
  data: joshChart,
  options: options
});

const branDataYear = generate(brandonCrawford, 'year');
const bryceDataYear = generate(bryceHarper, 'year');
const joshDataYear = generate(joshBell, 'year');
