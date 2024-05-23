export function WebSecureStorage(secret: string, iterations = 128) {
  return {
    local: {
      clear: () => {
        localStorage.clear();
      },

      getItem: (key: string) => {
        if (!key || key.length === 0) {
          throw new Error('key does not exist.');
        }

        localStorage.getItem(key);
      },

      setItem: (key: string, value: string) => {
        if (!key || key.length === 0) {
          throw new Error('key does not exist.');
        }

        if (!value || value.length === 0) {
          throw new Error('value does not exist.');
        }

        localStorage.setItem(key, value);
      },

      removeItem: (key: string) => {
        if (!key || key.length === 0) {
          throw new Error('key does not exist.');
        }

        localStorage.removeItem(key);
      },
    },
  };
}
