import { useState, useCallback } from 'react';

type ValidationRule<T> = (value: T) => string | undefined;
type ValidationRules<T> = { [K in keyof T]?: ValidationRule<T[K]>[] };

interface ValidationState<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  touched: { [K in keyof T]?: boolean };
  isValid: boolean;
}

interface UseFormValidationReturn<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  touched: { [K in keyof T]?: boolean };
  isValid: boolean;
  handleChange: (field: keyof T) => (value: T[keyof T]) => void;
  handleBlur: (field: keyof T) => () => void;
  validateField: (field: keyof T) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

export default function useFormValidation<T extends { [key: string]: any }>(
  initialValues: T,
  validationRules: ValidationRules<T>
): UseFormValidationReturn<T> {
  const [state, setState] = useState<ValidationState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: true,
  });

  const validateField = useCallback(
    (field: keyof T) => {
      const value = state.values[field];
      const rules = validationRules[field];

      if (!rules) return;

      for (const rule of rules) {
        const error = rule(value);
        if (error) {
          setState((prev) => ({
            ...prev,
            errors: { ...prev.errors, [field]: error },
            isValid: false,
          }));
          return;
        }
      }

      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [field]: undefined },
        isValid: Object.keys(prev.errors).length === 1, // Only this field was invalid
      }));
    },
    [state.values, validationRules]
  );

  const handleChange = useCallback(
    (field: keyof T) => (value: T[keyof T]) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [field]: value },
      }));
      validateField(field);
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [field]: true },
      }));
      validateField(field);
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    Object.keys(validationRules).forEach((field) => {
      validateField(field as keyof T);
    });

    return state.isValid;
  }, [state.isValid, validateField, validationRules]);

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
  };
}

// Example usage:
// const { values, errors, touched, handleChange, handleBlur, validateForm } = useFormValidation(
//   {
//     email: '',
//     password: '',
//   },
//   {
//     email: [
//       (value) => !value ? 'Email is required' : undefined,
//       (value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 'Invalid email address' : undefined,
//     ],
//     password: [
//       (value) => !value ? 'Password is required' : undefined,
//       (value) => value.length < 6 ? 'Password must be at least 6 characters' : undefined,
//     ],
//   }
// );
//
// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   if (validateForm()) {
//     // Submit form
//   }
// };
//
// return (
//   <form onSubmit={handleSubmit}>
//     <input
//       type="email"
//       value={values.email}
//       onChange={(e) => handleChange('email')(e.target.value)}
//       onBlur={handleBlur('email')}
//     />
//     {touched.email && errors.email && <span>{errors.email}</span>}
//
//     <input
//       type="password"
//       value={values.password}
//       onChange={(e) => handleChange('password')(e.target.value)}
//       onBlur={handleBlur('password')}
//     />
//     {touched.password && errors.password && <span>{errors.password}</span>}
//
//     <button type="submit">Submit</button>
//   </form>
// ); 