import { createContext } from "react"; // import the custom hook
import { useCurrentUser } from "../hooks/useCurrentUser";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
  const { user } = useCurrentUser();
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;