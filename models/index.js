const User = require('./User');
const Movie = require('./Movie');
const Preferences = require('./Preferences');
const MovieUser = require('./MovieUser.js');

User.hasOne(Preferences, {
  foreignKey: 'user_id'
});

Preferences.belongsTo(User, {
  foreignKey: 'user_id'
});

Movie.belongsToMany(User, {
  foreignKey: 'user_id',
  through: MovieUser,
});

User.belongsToMany(Movie, {
  foreignKey: 'movie_id',
  through: MovieUser,
});

module.exports = { User, Movie, Preferences, MovieUser,};
