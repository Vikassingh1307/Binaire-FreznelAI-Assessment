import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

class FirebaseAuthService {
  async signUp(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  }

  // Subscribes to auth state changes to update the UI globally
  subscribe(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}

// Export a singleton instance following OOP principles
export const authService = new FirebaseAuthService();
