const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect('mongodb+srv://admin:dbUserPassword@twittercluster.vl3uy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
      .then(() => {
        console.log('connection successful')
      })
      .catch((e) => {
        console.log('connection failed' + e)
      })
  }
}

module.exports = new Database();