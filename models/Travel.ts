import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Travel extends Model {
  public id!: number;
  public name!: string;
  public city!: string;
  public country!: string;
  public image!: string;
  public description!: string;
}

Travel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    country: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'travels',
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Travel;