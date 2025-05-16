export interface Cours {
    id: string; // ID généré par Firestore
    nom: string;
    classe: string;
    pdf: File | string; // pdf est maintenant optionnel

  }