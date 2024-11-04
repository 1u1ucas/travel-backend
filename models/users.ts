// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/database';

// class Users extends Model {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
// }

// Users.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     email: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'users',
//     sequelize, // passing the `sequelize` instance is required
//   }
// );

// export default Users;