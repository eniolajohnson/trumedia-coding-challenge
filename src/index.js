import { players, joshBell, bryceHarper, brandonCrawford } from './data';

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

formatDate(joshBell);

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
    const resultOPS = obp+slg;
    arr.OPS = resultOPS;

    const resultAVG  = (arr['H'] / arr['AB']).toFixed(3)
    arr.AVG = Number(resultAVG);
  })
  return arrR;
}

const mew = generate(joshBell, 'year');
console.log(mew)


