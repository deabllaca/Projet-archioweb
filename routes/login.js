import { User } from "../model/User.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secretKey = process.env.SECRET_KEY || "changeme"; // Vous devriez utiliser une clé secrète plus complexe et la stocker en sécurité.

// Route pour enregistrer un nouvel utilisateur
router.post("/signup", async (req, res) => {
  try {
    // Vérifiez si l'utilisateur existe déjà
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send("Un utilisateur avec cet email existe déjà.");
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Création de l'utilisateur
    user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save(); // Sauvegarde de l'utilisateur dans la base de données

    res.status(201).send("Utilisateur enregistré avec succès.");
  } catch (error) {
    res.status(500).send("Erreur lors de l'enregistrement de l'utilisateur.");
  }
});

router.post("/inscription", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de lenregistrement de lutilisateur" });
  }
});

// Route pour l'authentification d'un utilisateur
router.post("/connect", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Email ou mot de passe incorrect.");
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).send("Email ou mot de passe incorrect.");
    }

    // Création du JWT
    const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // Expiration dans 7 jours
    const token = jwt.sign({ sub: user._id, exp }, secretKey);

    res.send({ token, user });
  } catch (error) {
    res.status(500).send("Erreur lors de l'authentification de l'utilisateur.");
  }
});

export default router;
