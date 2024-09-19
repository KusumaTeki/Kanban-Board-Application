export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  
  export const getFromLocalStorage = (key, defaultValue) => {
    return localStorage.getItem(key) || defaultValue;
  };
  