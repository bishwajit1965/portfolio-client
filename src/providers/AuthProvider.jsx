import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { app } from "../firebase/firebase.config";
import axios from "axios";

// import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  // Newly modified for JWT on 29.09.2024
  const API_URL = "http://localhost:5000/api/auth"; //Adjust based on backend URI

  // Create user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      // create user in Firebase
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = response.user.getIdToken(); // Firebase token

      // Send firebase token to backend (if you want to store it in local storage)
      const { data } = await axios.post(`${API_URL}/register`, {
        email,
        password,
        token,
      });
      // Store JWT from the backend (if you want to store it in local storage)
      localStorage.setItem("jwt", data.token);

      await axios.post(`${API_URL}/register`, { email, password, token });
    } catch (error) {
      console.error("Error during user creation:", error);
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const signIn = async (email, password) => {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = response.user.getIdToken();

      // Send firebase token to backend (if you want to store it in local storage)
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
        token,
      });
      localStorage.setItem("token", data.data);
      setUser(response.user);
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in using google
  const signInWithGoogle = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = result.user.accessToken;
      console.log("Token", token);
      // Send token to your server for further processing if needed
      const { data } = await axios.post(`${API_URL}/google-login`, { token });
      // Store JWT from backend
      localStorage.setItem("jwt", data.token);

      setUser(result.user); // Set user from Firebase
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Logout
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("jwt");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken(); //Get firebase token
        setUser(currentUser); //Set user if logged in
        console.log("Token", token);
      } else {
        setUser(null); // Clear user if not logged in
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    handleSignOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
