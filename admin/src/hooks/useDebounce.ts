import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Example usage:
// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
// 
// useEffect(() => {
//   if (debouncedSearchTerm) {
//     searchAPI(debouncedSearchTerm);
//   }
// }, [debouncedSearchTerm]);
// 
// return (
//   <input
//     type="text"
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     placeholder="Search..."
//   />
// );

export default useDebounce; 