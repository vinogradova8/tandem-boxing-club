import { useState } from 'react';

export function useSessionStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const data = sessionStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      sessionStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (action: T | ((value: T) => T)) => {
    let newValue: T;

    if (typeof action === 'function') {
      newValue = (action as (value: T) => T)(value);
    } else {
      newValue = action;
    }

    sessionStorage.setItem(key, JSON.stringify(newValue));

    setValue(newValue);
  };

  return [value, save];
}
