export function getStorage(storage: 'local' | 'session') {
  if (storage === 'session') {
    return sessionStorage;
  } else {
    return localStorage;
  }
}
