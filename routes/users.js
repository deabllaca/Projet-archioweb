import express from "express";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user'); // Importez votre modèle d'utilisateur

const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Got a response from the users route");
});


// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de lenregistrement de lutilisateur' });
  }
});


// Route de connexion
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (!user) {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }

  const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: config.expiresIn });

  res.json({ token });
});


// Route pour obtenir tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // N'exposez pas les mots de passe dans la réponse
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route pour obtenir un utilisateur par son ID
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, '-password'); // N'exposez pas le mot de passe
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
});


// Route de mise à jour d'un utilisateur par son ID
router.put('/users/:userId', async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    // Vous pouvez ajouter des vérifications et des validations supplémentaires ici

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { firstName, lastName, userName, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

// Route de suppression d'un utilisateur par son ID
router.delete('/users/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

module.exports = router;

export default router;
