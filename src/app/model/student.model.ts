export interface Student {
imageBase64: any;
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      dateOfBirth: string;
      course: string;
      previewUrl: string ; // ou null ou undefined selon l'usage
     image : File;
}    