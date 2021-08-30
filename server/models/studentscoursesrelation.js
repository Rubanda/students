'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentsCoursesRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentsCoursesRelation.belongsTo(models.Student, {foreignKey: "student_id"})
      StudentsCoursesRelation.belongsTo(models.Course, {foreignKey: "course_id"})

    }
  };
  StudentsCoursesRelation.init({
    student_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentsCoursesRelation',
  });
  return StudentsCoursesRelation;
};