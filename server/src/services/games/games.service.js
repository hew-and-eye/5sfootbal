// Initializes the `games` service on path `/games`
const createService = require('feathers-mongodb');
const hooks = require('./games.hooks');
const game = require('./game-model');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = {
    Model: game,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/games', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('games');

  mongoClient.then(db => {
    service.Model = db.collection('games');
  });

  service.hooks(hooks);
};
