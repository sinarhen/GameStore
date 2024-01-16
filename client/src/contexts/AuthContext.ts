import { createContext } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;