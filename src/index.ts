export function WebSecureStorage(secret: string, iterations = 128) {
  return {
    local: {
      clear: () => {
        localStorage.clear();
      },
      getItem: (key: string) => {
        localStorage.getItem(key);
      },
      setItem: (key: string, value: string) => {
        localStorage.setItem(key, value);
      },
      removeItem: (key: string) => {
        localStorage.removeItem(key);
      },
    },
  };
}
