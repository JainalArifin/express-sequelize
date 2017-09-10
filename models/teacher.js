'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      isUnique :true,
      validate:{
        isEmail: true,
      }
    }
  });

  Teacher.associate = (models) =>{
    Teacher.belongsTo(models.Subject)
  }
  return Teacher;
};
