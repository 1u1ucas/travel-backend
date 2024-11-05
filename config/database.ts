import { Sequelize } from 'sequelize'; // Importation du module Sequelize
import dotenv from 'dotenv';

dotenv.config();

// Création d'une instance de Sequelize pour se connecter à la base de données MySQL
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!,  {
  host: process.env.DB_HOST!, // Adresse du serveur de base de données
  dialect: 'mysql', // Type de base de données
  port: Number(process.env.DB_PORT!) || 3306, // Port de connexion à la base de données
});

// Fonction asynchrone pour tester la connexion à la base de données
const testConnection = async () => {
  try {
    // Tentative d'authentification à la base de données
    await sequelize.authenticate();
    console.log('Connexion à la base de données MySQL réussie.');
     // Message de succès
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error); // Message d'erreur
  }
};

// Appel de la fonction pour tester la connexion
testConnection();

export default sequelize;