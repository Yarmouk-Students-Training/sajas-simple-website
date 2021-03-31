'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post,{ foreignkey:'userId'})

    }

    toJSON(){
      return {...this.get(),id:undefined}
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{ msg:'User must have a name'},
        notEmpty:{msg:'Name must not be empty'},
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User must have a email'},
        notEmpty:{msg:'email must not be empty'},
        isEmail:{msg:'Must be a valid email address'},
      }
    },
    role:{type: DataTypes.STRING,
      allowNull:false,
    },
  
    sequelize,
    modelName: 'User',
  });
  return User;
};