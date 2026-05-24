export interface Question {
  id: number;
  affirmation: string;
  reponse: boolean;
  explication: string;
  categorie: string;
}

export interface ReponseUtilisateur {
  questionId: number;
  reponse: boolean;
  correct: boolean;
}
