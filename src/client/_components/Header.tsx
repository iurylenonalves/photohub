'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { useTranslations } from '@/context/TranslationContext';


import styles from '../../styles/header.module.css';
import ToggleLanguageButton from './ToggleLanguageButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useTranslations();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
        <Image src="/images/logo-brunaalvesphoto-thumbnail.webp" alt="Logo" width={150} height={50} priority/>
        </Link>

        {/* Menu for large screens */}
        <nav className={styles.nav}>
          <Link href="#about" className={styles.navLink}>{translations.about}</Link>
          <Link href="#portfolio" className={styles.navLink}>{translations.portfolio}</Link>
          <Link href="#contact" className={styles.navLink}>{translations.contact}</Link>
        </nav>

        {/* Buttons - WhatsApp, Instagram and Language */}
        <div className={styles.buttonGroup}>
          <a
            href="https://wa.me/447542554870?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.whatsapp}`}
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/brunaalvesphoto/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.instagram}`}
          >
            <Instagram size={20} />
            Instagram
          </a>

          <ToggleLanguageButton />
        </div>

        {/* Menu Mobile */}
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <nav className={styles.mobileMenu}>
          <Link href="#about" onClick={() => setIsOpen(false)}>{translations.about}</Link>
          <Link href="#portfolio" onClick={() => setIsOpen(false)}>{translations.portfolio}</Link>
          <Link href="#contact" onClick={() => setIsOpen(false)}>{translations.contact}</Link>

          {/* Botões no menu mobile */}
          <a
            href="https://wa.me/447542554870?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.whatsapp}`}
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/brunaalvesphoto/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.instagram}`}
          >
            <Instagram size={20} />
            Instagram
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;