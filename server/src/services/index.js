const games = require('./games/games.service.js');
const plays = require('./plays/plays.service.js');
const players = require('./players/players.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(games);
  app.configure(plays);
  app.configure(players);
};
