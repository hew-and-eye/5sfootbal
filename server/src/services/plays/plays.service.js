// Initializes the `plays` service on path `/plays`
const createService = require('feathers-mongodb');
const hooks = require('./plays.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/plays', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('plays');

  mongoClient.then(db => {
    service.Model = db.collection('plays');
  });

  service.hooks(hooks);
};
