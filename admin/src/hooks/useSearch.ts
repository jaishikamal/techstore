import { useState, useCallback, useMemo } from 'react';

interface SearchConfig {
  searchTerm: string;
  filters: { [key: string]: any };
}

interface UseSearchProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  filterConfig?: { [key: string]: (value: any) => boolean };
}

interface UseSearchReturn<T> {
  filteredData: T[];
  searchConfig: SearchConfig;
  setSearchTerm: (term: string) => void;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  clearSearch: () => void;
}

export function useSearch<T>({
  data,
  searchFields,
  filterConfig = {},
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({
    searchTerm: '',
    filters: {},
  });

  const setSearchTerm = useCallback((term: string) => {
    setSearchConfig((prev) => ({ ...prev, searchTerm: term }));
  }, []);

  const setFilter = useCallback((key: string, value: any) => {
    setSearchConfig((prev) => ({
      ...prev,
      filters: { ...prev.filters, [key]: value },
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchConfig((prev) => ({ ...prev, filters: {} }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchConfig({ searchTerm: '', filters: {} });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item: T) => {
      // Apply search term filter
      if (searchConfig.searchTerm) {
        const searchTermLower = searchConfig.searchTerm.toLowerCase();
        const matchesSearch = searchFields.some((field) => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(searchTermLower);
        });
        if (!matchesSearch) return false;
      }

      // Apply custom filters
      return Object.entries(searchConfig.filters).every(([key, value]) => {
        if (!value) return true;
        const filterFn = filterConfig[key];
        if (!filterFn) return true;
        return filterFn(item[key as keyof T]);
      });
    });
  }, [data, searchConfig, searchFields, filterConfig]);

  return {
    filteredData,
    searchConfig,
    setSearchTerm,
    setFilter,
    clearFilters,
    clearSearch,
  };
}

// Example usage:
// const { filteredData, setSearchTerm, setFilter } = useSearch({
//   data: users,
//   searchFields: ['name', 'email'],
//   filterConfig: {
//     role: (value) => value === 'admin',
//     status: (value) => value === 'active',
//   },
// }); 