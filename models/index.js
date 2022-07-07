const User = require('./User');
const Preferences = require('./Preferences');
const Favorite = require('./Favorite.js');

User.hasOne(Preferences, {
  foreignKey: 'user_id'
});

Preferences.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Preferences, Favorite };
