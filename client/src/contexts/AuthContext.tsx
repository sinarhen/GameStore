import { createContext, useEffect, useState } from "react"; // import the custom hook
import { useCurrentUser } from "../hooks/useCurrentUser";
import { User } from "../lib/types";
import { fetchUser } from "../lib/auth";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchUser().then((fetchedUser: User) => {
      setUser(fetchedUser);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);
  const isAdmin = user?.role === "admin";
  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;