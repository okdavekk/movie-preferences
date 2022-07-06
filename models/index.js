const User = require('./User');
const Movie = require('./Movie');
const Preferences = require('./Preferences');

User.hasOne(Preferences, {
  foreignKey: 'user_id'
});

Preferences.belongsTo(User, {
  foreignKey: 'user_id'
});

// Gallery.hasMany(Painting, {
//   foreignKey: 'gallery_id',
// });

// Painting.belongsTo(Gallery, {
//   foreignKey: 'gallery_id',
// });

module.exports = { User, Movie, Preferences};
