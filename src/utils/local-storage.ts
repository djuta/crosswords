export const setLocalStorageObj = (key: string, obj: Object) => {
  const value = JSON.stringify(obj);
  localStorage.setItem(key, value);
};

export const removeLocalStorageObj = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorageObj = (key: string) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};
