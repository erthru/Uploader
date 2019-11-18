'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
    name: DataTypes.TEXT
  }, {});
  files.associate = function(models) {
    // associations can be defined here
  };
  return files;
};