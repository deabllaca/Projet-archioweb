const mongoose = require("mongoose");

// Définition du schéma Véhicule
const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Voiture", "Moto", "Vélo", "Autre"], // Vous pouvez ajouter ou modifier ces types selon vos besoins
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  // Relation avec le modèle User pour savoir à qui appartient le véhicule
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Exportation du modèle Véhicule pour l'utiliser ailleurs dans l'application
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
