import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

interface UseThemeReturn {
  theme: Theme;
  themeConfig: ThemeConfig;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
}

const defaultLightConfig: ThemeConfig = {
  theme: 'light',
  primaryColor: '#3B82F6',
  secondaryColor: '#6B7280',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
};

const defaultDarkConfig: ThemeConfig = {
  theme: 'dark',
  primaryColor: '#60A5FA',
  secondaryColor: '#9CA3AF',
  backgroundColor: '#1F2937',
  textColor: '#F9FAFB',
};

export function useTheme(): UseThemeReturn {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    // Check if theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedConfig = localStorage.getItem('themeConfig');

    if (savedConfig) {
      return JSON.parse(savedConfig);
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? defaultDarkConfig : defaultLightConfig;
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', themeConfig.theme);
    localStorage.setItem('themeConfig', JSON.stringify(themeConfig));

    // Update document class for theme
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(themeConfig.theme);

    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', themeConfig.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', themeConfig.secondaryColor);
    document.documentElement.style.setProperty('--background-color', themeConfig.backgroundColor);
    document.documentElement.style.setProperty('--text-color', themeConfig.textColor);
  }, [themeConfig]);

  const toggleTheme = useCallback(() => {
    setThemeConfig((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setThemeConfig((prev) => ({
      ...prev,
      theme,
    }));
  }, []);

  const updateThemeConfig = useCallback((config: Partial<ThemeConfig>) => {
    setThemeConfig((prev) => ({
      ...prev,
      ...config,
    }));
  }, []);

  return {
    theme: themeConfig.theme,
    themeConfig,
    toggleTheme,
    setTheme,
    updateThemeConfig,
  };
}

// Example usage:
// const { theme, themeConfig, toggleTheme, updateThemeConfig } = useTheme();
//
// // Toggle between light and dark mode
// toggleTheme();
//
// // Update theme colors
// updateThemeConfig({
//   primaryColor: '#FF0000',
//   secondaryColor: '#00FF00',
// }); 