import express, { Request, Response } from 'express';
import sequelize from '../config/database'; // Importation de la configuration de la base de données
import Travel from '../models/Travel'; // Importation du modèle Travel
import Users from '../models/users'; // Importation du modèle Users
import cors from 'cors';




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
    res.status(500).json({ error: 'Failed to create travel' });
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

// Define routes for Users

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await Users.create({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});





