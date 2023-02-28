export const STORAGE = {
  LOCAL: 'LOCAL',
  SESSION: 'SESSION',
} as const;
export type STORAGE = (typeof STORAGE)[keyof typeof STORAGE];

function SecureStorage(storage: string) {
  const getStorage = (storage: string): Storage => {
    switch (storage) {
      case STORAGE.LOCAL:
        return localStorage;
      case STORAGE.SESSION:
        return sessionStorage;
      default:
        return localStorage;
    }
  };

  return {
    getItem: (key: string): string | null => {
      return getStorage(storage).getItem(key);
    },
    setItem: (key: string, value: string) => {
      getStorage(storage).setItem(key, value);
    },
  };
}

// export const user = () => {
//   const name = (): number => {
//     // const value = 2;
//     console.log('###########################################');
//     return 3;
//   };

//   const email = (): number => {
//     // const value = 2;
//     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
//     return 3;
//   };

//   // const test = (): number => {
//   //   // const value = 2;
//   //   console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
//   //   return 3;
//   // };

//   return { name: name, email: email };
// };

// const a = user();
// a.name();
