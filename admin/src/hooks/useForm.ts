import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: (value: any) => string | undefined;
}

interface UseFormProps<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit: (values: T) => Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setFieldValue: (field: keyof T, value: any) => void;
}

export function useForm<T extends { [key: string]: any }>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback(
    (name: string, value: any) => {
      const validate = validationRules[name];
      if (validate) {
        return validate(value);
      }
      return undefined;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    },
    [validateField, values]
  );

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field as string, value);
    setErrors((prev) => ({ ...prev, [field]: error || '' }));
  }, [validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      const newErrors: { [key: string]: string } = {};
      Object.keys(values).forEach((key) => {
        const error = validateField(key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      });

      setErrors(newErrors);

      // If there are no errors, submit the form
      if (Object.keys(newErrors).length === 0) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }
    },
    [values, validateField, onSubmit]
  );

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
}

// Example usage:
// const { values, errors, handleChange, handleSubmit } = useForm({
//   initialValues: { email: '', password: '' },
//   validationRules: {
//     email: (value) => !value ? 'Email is required' : undefined,
//     password: (value) => !value ? 'Password is required' : undefined,
//   },
//   onSubmit: async (values) => {
//     await login(values.email, values.password);
//   },
// }); 