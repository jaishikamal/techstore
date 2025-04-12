import { useState, useEffect } from 'react';

interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

function useCookie<T>(key: string, initialValue: T, options: CookieOptions = {}): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from cookie by key
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${key}=`));

      if (cookie) {
        const value = cookie.split('=')[1];
        return JSON.parse(decodeURIComponent(value));
      }
      return initialValue;
    } catch (error) {
      console.error('Error reading from cookie:', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to cookie.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);

      // Create cookie string
      let cookieString = `${key}=${encodeURIComponent(JSON.stringify(valueToStore))}`;

      // Add options
      if (options.expires) {
        const expires = options.expires instanceof Date
          ? options.expires
          : new Date(Date.now() + options.expires * 864e5);
        cookieString += `; expires=${expires.toUTCString()}`;
      }

      if (options.path) cookieString += `; path=${options.path}`;
      if (options.domain) cookieString += `; domain=${options.domain}`;
      if (options.secure) cookieString += '; secure';
      if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

      // Set cookie
      document.cookie = cookieString;
    } catch (error) {
      console.error('Error saving to cookie:', error);
    }
  };

  // Remove cookie
  const removeCookie = () => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setStoredValue(initialValue);
  };

  return [storedValue, setValue];
}

// Example usage:
// const [authToken, setAuthToken] = useCookie('authToken', '', {
//   expires: 7, // 7 days
//   secure: true,
//   sameSite: 'Strict',
// });
// 
// const [userPreferences, setUserPreferences] = useCookie('preferences', {
//   theme: 'light',
//   language: 'en',
// });
// 
// // Update auth token
// setAuthToken('new-token-123');
// 
// // Update preferences
// setUserPreferences({ theme: 'dark', language: 'es' });

export default useCookie; 