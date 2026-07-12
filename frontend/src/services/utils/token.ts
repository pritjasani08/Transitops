export const getStoredToken = () => localStorage.getItem('access_token');
export const setStoredToken = (token: string) => localStorage.setItem('access_token', token);
export const removeStoredToken = () => localStorage.removeItem('access_token');
