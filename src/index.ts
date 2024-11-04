import express, { Request, Response } from 'express';
import sequelize from '../config/database'; // Importation de la configuration de la base de données
import Travel from '../models/Travel'; // Importation du modèle Travel
import cors from 'cors';
import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import Users from '../models/users'; // Importation du modèle Users
// import bcrypt from 'bcryptjs';

dotenv.config();

const app = express(); // Création d'une instance de l'application express
const PORT = process.env.PORT || 8000; // Définition du port sur lequel le serveur va écouter

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: Error) => console.log('Error: ' + err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
}); // Synchronisation du modèle avec la base de données

// Define routes for Travel
app.get('/travels', async (req: Request, res: Response) => {
  try {
    const travels = await Travel.findAll();
    res.json(travels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch travels' });
  }
});

app.get('/travels/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const travel = await Travel.findByPk(id);
    if (travel) {
      res.json(travel);
    } else {
      res.status(404).json({ error: 'Travel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch travel' });
  }
});

app.post('/travels', async (req: Request, res: Response) => {
  const { name, city, country, image, description } = req.body;
  try {
    const travel = await Travel.create({ name, city, country, image, description });
    res.json(travel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create travel back' });
  }
});

app.put('/travels/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, city, country, image, description } = req.body;
  try {
    const travel = await Travel.findByPk(id);
    if (travel) {
      travel.name = name;
      travel.city = city;
      travel.country = country;
      travel.image = image;
      travel.description = description;
      await travel.save();
      res.json(travel);
    } else {
      res.status(404).json({ error: 'Travel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update travel' });
  }
});

app.delete('/travels/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const travel = await Travel.findByPk(id);
    if (travel) {
      await travel.destroy();
      res.json({ message: 'Travel deleted' });
    } else {
      res.status(404).json({ error: 'Travel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete travel' });
  }
});

// // Define routes for Users


// // Récupérer tous les utilisateurs
// app.get('/users', async (req: Request, res: Response) => {
//   try {
//     const users = await Users.findAll();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// // Récupérer un utilisateur par ID
// app.get('/users/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.findByPk(id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// });

// // Créer un utilisateur (enregistrement)
// app.post('/users', async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//   try {
//     // Hacher le mot de passe
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Créer un nouvel utilisateur
//     const user = await Users.create({ name, email, password: hashedPassword });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// // Mise à jour d'un utilisateur
// app.put('/users/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;
//   try {
//     const user = await Users.findByPk(id);
//     if (user) {
//       // Hacher le mot de passe mis à jour s'il est fourni
//       const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

//       user.name = name || user.name;
//       user.email = email || user.email;
//       user.password = hashedPassword;
//       await user.save();
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });

// // Supprimer un utilisateur
// app.delete('/users/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.json({ message: 'User deleted' });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// });

// // Route de connexion utilisateur
// app.post('/users/login', async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   try {
//     // Rechercher l'utilisateur avec l'email fourni
//     const user = await Users.findOne({ where: { email } });
//     if (user) {
//       // Comparer les mots de passe
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         // Générer un token JWT
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//         res.json({ message: 'Login successful', token });
//       } else {
//         res.status(401).json({ error: 'Incorrect password' });
//       }
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // Middleware pour vérifier le token JWT
// const authenticateJWT = (req: Request, res: Response, next: Function) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user; // Ajouter les données de l'utilisateur à la requête
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// // Exemple d'utilisation du middleware pour une route protégée
// app.get('/protected', authenticateJWT, (req: Request, res: Response) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });
