import { Timestamp } from '@angular/fire/firestore';

export interface User {
  uid: string;
  email: string;
  username?: string;
  createdAt?: Date | Timestamp;
  lastLoginAt?: Date | Timestamp;
  emailVerified?: boolean;
  photoURL?: string;
  displayName?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  createdAt: Date | Timestamp;
  lastLoginAt?: Date | Timestamp;
  role?: string;
  phoneNumber?: string;
  address?: string;
}