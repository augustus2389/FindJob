const accessToken = "token";

export const setAccessToken = (token: string) => {
  localStorage.setItem(accessToken, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(accessToken);
};

export const removeAccessToken = () => {
  return localStorage.removeItem(accessToken);
};
