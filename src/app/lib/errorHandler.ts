import { useError } from './ErrorContext';

export const handleError = (error: Error) => {
  const { showError } = useError();
  console.error('API Error:', error);
  showError(error.message || 'Something went wrong');
};