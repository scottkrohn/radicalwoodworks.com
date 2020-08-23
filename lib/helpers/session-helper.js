export const getSession = (key) => {
  return IS_CLIENT ? window.sessionStorage.getItem(key) : null;
};

export const setSession = (key, value) => {
  IS_CLIENT && window.sessionStorage.setItem(key, value);
};
