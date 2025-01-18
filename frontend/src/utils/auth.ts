import { jwtDecode } from "jwt-decode";

interface TokenData {
  role: string;
  userId: number;
  // Add other token fields you need
}

export const getRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenData>(token);
    return decoded.role;
  } catch {
    return null;
  }
};

export const getTokenData = (): TokenData | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenData>(token);
  } catch {
    return null;
  }
};

// export const isTokenExpired = (): boolean => {
//   const token = localStorage.getItem("token");
//   if (!token) return true;

//   try {
//     const decoded = jwtDecode<TokenData>(token);
//     return decoded.exp * 1000 < Date.now();
//   } catch {
//     return true;
//   }
// };

export const getUser = () => {
  const decoded = getTokenData();
  if (!decoded) return null;

  return {
    id: decoded.userId,
  };
};
