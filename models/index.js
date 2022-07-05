const User = require('./User');
const Movie = require('./Movie');
const Preferences = require('./Preferences');

Gallery.hasMany(Painting, {
  foreignKey: 'gallery_id',
});

Painting.belongsTo(Gallery, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Movie, Painting };
