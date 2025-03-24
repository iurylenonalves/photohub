
import { useState } from 'react';
import { z } from 'zod';
import { ContactSchema } from '@/schemas/ContactSchema';

interface Translations {
  contactSuccess: string;
  contactError: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendMessageButton: string;
  errorMessage: string;
  networkError: string;
  tooManyRequests: string;
  loading: string;
}

export const useContactForm = (locale: string, translations: Translations) => {
  const contactSchema = ContactSchema(locale as 'en' | 'pt');
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', lang: locale });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const dataToSend = { ...formData, lang: locale };

    setStatus(translations.loading || 'loading');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', lang: locale });
      } else if (response.status === 429) {       
        setStatus('too-many-requests');
      } else {
        setStatus(result.message || translations.errorMessage || 'An error occurred.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus(translations.networkError || 'Network error. Please try again later.');
    }
    
  };

  return { formData, errors, status, handleChange, handleSubmit };
};