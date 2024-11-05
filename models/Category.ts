import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Category extends Model {
    public id!: number;
    public name!: string;   
    public description!: string;
}

Category.init(
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
    description: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Category;