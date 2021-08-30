'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Student.belongsTo(models.Class, {foreignKey: "class_id", as: "class"})
      Student.belongsToMany(models.Course, {through: "StudentsCoursesRelations", foreignKey: "course_id", as: "courses"})
    }
  };
  Student.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};