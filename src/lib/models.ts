import mongoose from 'mongoose';

// Définition du schéma pour les questions et réponses
const questionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  gedId: {
    ref: 'Ged',
    type: mongoose.Schema.Types.ObjectId,
  },
});



// Définition du modèle basé sur le schéma
export default mongoose.models.QuestionAnswer ||
  mongoose.model('QuestionAnswer', questionAnswerSchema);

