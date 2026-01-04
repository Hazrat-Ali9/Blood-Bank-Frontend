// Auth helpers
export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
export const isLoggedIn = () => !!getToken();

// Decode JWT payload
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role; // backend a role claim thakte hobe
  } catch {
    return null;
  }
};
