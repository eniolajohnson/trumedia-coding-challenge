const fat = require("bryce.json")
console.log(fat)

const players = [
  {
    "playerId": 543063,
    "fullName": "Brandon Crawford",
    "playerImage": "https://img.mlbstatic.com/mlb-photos/image/upload/w_426,q_100/v1/people/543063/headshot/67/current",
    "teamImage": "http://static.trumedianetworks.com/images/mlb/teams/137.png"
  },
  {
    "playerId": 547180,
    "fullName": "Bryce Harper",
    "playerImage": "https://img.mlbstatic.com/mlb-photos/image/upload/w_426,q_100/v1/people/547180/headshot/67/current",
    "teamImage": "http://static.trumedianetworks.com/images/mlb/teams/120.png"
  },
  {
    "playerId": 605137,
    "fullName": "Josh Bell",
    "playerImage": "https://img.mlbstatic.com/mlb-photos/image/upload/w_426,q_100/v1/people/605137/headshot/67/current",
    "teamImage": "http://static.trumedianetworks.com/images/mlb/teams/134.png"
  }
]

const formatDate = (arr) => {
  arr.map(stats => {
    const date = new Date(stats.gameDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const dayMth = day + " " + month;
    stats.newDate = dayMth;
  })
  return arr;
}
