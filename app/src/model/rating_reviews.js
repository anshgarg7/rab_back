'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RatingReview.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    taxi_booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rating: {
      type: DataTypes.ENUM('1','2','3','4','5'),
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'rating_reviews',
  });

  return RatingReview;

};


