import express, { Request, Response } from 'express';
import sequelize from '../config/database'; // Importation de la configuration de la base de données
import Travel from '../models/Travel'; // Importation du modèle Travel

const app = express(); // Création d'une instance de l'application express
const PORT = process.env.PORT || 8000; // Définition du port sur lequel le serveur va écouter

// Middleware to parse JSON
app.use(express.json());

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: Error) => console.log('Error: ' + err));

// Define routes
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
}); // Synchronisation du modèle avec la base de données