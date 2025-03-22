'use client';

import { useTranslations } from "@/context/TranslationContext";


interface ContactFormProps {
  formData: { name: string; email: string; message: string };
  // setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  handleSubmit: (e: React.FormEvent) => void;
  status: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: { name?: string; email?: string; message?: string };
}




const ContactForm = ({ formData, handleSubmit, status, handleChange, errors }: ContactFormProps) => {
  const { translations } = useTranslations();

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <input
        type="text"
        name="name"
        placeholder={translations.namePlaceholder}
        value={formData.name}
        onChange={handleChange}
        aria-label={translations.nameLabel}
        className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
      />
       {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
      <input
        type="email"
        name="email"
        placeholder={translations.emailPlaceholder}
        value={formData.email}
        onChange={handleChange}
        aria-label={translations.emailLabel}    
        className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
      />
       {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
    
      <div>
      <textarea
        id="message"
        name="message"
        placeholder={translations.messagePlaceholder}
        value={formData.message}
        onChange={handleChange}
        aria-label={translations.messageLabel}    
        className={`w-full p-3 border rounded-lg ${errors.message ? 'border-red-500' : ''}`}
      />
       {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      {status === 'loading' ? (
        <button
          type="button"
          className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
          disabled
        >
          {translations.sendingMessageButton}
        </button>
      ) : (
        <button
          type="submit"
          className="w-full py-3 bg-gray-500 text-white font-semibold cursor-pointer rounded-lg hover:bg-gray-600 transition"
        >
          {translations.sendMessageButton}
        </button>
      )}

      {status === 'success' && (
        <p className="text-green-600 mt-2 animate-fadeIn" aria-live="polite">{translations.contactSuccess}</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-2 animate-fadeIn" aria-live="polite">{translations.contactError}</p>
      )}
    </form>
  );
};

export default ContactForm;