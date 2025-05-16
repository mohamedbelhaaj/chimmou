import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{User} from 'src/app/model/user.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // Inscription
  async signUp(email: string, password: string, username: string): Promise<any> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = credential.user;
      
      // Stocker des informations supplémentaires dans Firestore
      await this.firestore.collection('users').doc(user?.uid).set({
        uid: user?.uid,
        email: email,
        username: username,
        createdAt: new Date()
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Connexion
  async login(email: string, password: string): Promise<any> {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  // Réinitialisation du mot de passe
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  // Vérifier l'état d'authentification
  getAuthState() {
    return this.afAuth.authState;
  }
}