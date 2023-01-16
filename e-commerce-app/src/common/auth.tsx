// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKpQ8sxTLLw9SR3L0U485E67sKw6vuQgE",
  authDomain: "e-com-app-fa7d9.firebaseapp.com",
  projectId: "e-com-app-fa7d9",
  storageBucket: "e-com-app-fa7d9.appspot.com",
  messagingSenderId: "1063188352555",
  appId: "1:1063188352555:web:0fe8d297a9c31fdb1d246e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export type AuthContextType = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signOutUser = () => signOut(auth);

  return {
    user,
    signUp,
    signIn,
    signOut: signOutUser,
    loading,
  };
}

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);
