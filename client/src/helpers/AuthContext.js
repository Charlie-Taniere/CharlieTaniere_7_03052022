import { createContext } from 'react'

export const AuthContext = createContext('') // Export du contexte pour suivre l'état de l'authentification de l'utilisateur
export const AuthProvider = AuthContext.Provider // Export du contexte Provider pour les routes de l'app
