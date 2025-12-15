
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login con Google
    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Verificar si el usuario ya existe en Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    points: 50,
                    level: "Newbie",
                    createdAt: serverTimestamp(),
                });
            }
            return user;
        } catch (error) {
            console.error("Error login google: ", error);
            throw error;
        }
    }

    // Registro con Email/Password
    async function registerWithEmail(email, password, userData) {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            // Crear documento en Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                name: userData.nombre,
                phone: userData.telefono || "",
                address: userData.direccion || "",
                birthdate: userData.nacimiento || "",
                photoURL: "https://ui-avatars.com/api/?name=" + userData.nombre, // Avatar default
                points: 50, // Bono bienvenida
                level: "Newbie",
                createdAt: serverTimestamp(),
            });
            return user;
        } catch (error) {
            console.error("Error registro email: ", error);
            throw error;
        }
    }

    // Login con Email/Password
    async function loginWithEmail(email, password) {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error login email: ", error);
            throw error;
        }
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Escuchar cambios en el documento de usuario (Puntos en tiempo real)
                const userRef = doc(db, "users", user.uid);
                const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setCurrentUser({ ...user, ...docSnap.data() });
                    } else {
                        // Fallback si no existe doc (raro si creamos al login)
                        setCurrentUser(user);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error en snapshot:", error);
                    setLoading(false);
                });

                return () => unsubscribeSnapshot();
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });

        return unsubscribeAuth;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
