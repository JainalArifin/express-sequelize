'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isUnique :true,
      validate:{
        isEmail: true,
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {
      through: 'StudentSubject'
    })
    Student.hasMany(models.StudentSubject)
  }
  return Student;
};
