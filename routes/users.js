import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import config from "../../config.js";
import { User } from "../model/User.js";

const router = express.Router();
const secretKey = process.env.SECRET_KEY || "changeme"; // Vous devriez utiliser une clé secrète plus complexe et la stocker en sécurité.

// Route pour obtenir tous les utilisateurs "users"
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // N'exposez pas les mots de passe dans la réponse
    res.send(users);
  } catch (error) {
    res.status(500).json({ error: "43634" });
  }
});

// Route pour obtenir un utilisateur par son ID
router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, "-password"); // N'exposez pas le mot de passe
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "23452" });
  }
});

// Route de mise à jour d'un utilisateur par son ID
router.put("/users/:userId", async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    // Vous pouvez ajouter des vérifications et des validations supplémentaires ici

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { firstName, lastName, userName, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

// module.exports = router;
// Test

export default router;
