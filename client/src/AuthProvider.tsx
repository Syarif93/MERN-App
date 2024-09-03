import { createContext, ReactNode, useState } from "react";

export interface IAuthContextType {
  auth: boolean;
  updateAuth: (newAuth: boolean) => void;
}

// Membuat context
export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);

  const updateAuth = (auth: boolean) => {
    setAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
