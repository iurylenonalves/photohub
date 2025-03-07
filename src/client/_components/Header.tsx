'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import styles from '../../styles/header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
        <Image src="/images/logo-brunaalvesphoto-thumbnail.webp" alt="Logo" width={150} height={50} priority/>
        </Link>

        {/* Menu para telas grandes */}
        <nav className={styles.nav}>
          <Link href="#about" className={styles.navLink}>Sobre</Link>
          <Link href="#portfolio" className={styles.navLink}>Portfólio</Link>
          <Link href="#contact" className={styles.navLink}>Contato</Link>
        </nav>

        {/* Botões do WhatsApp e Instagram */}
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
        </div>

        {/* Menu Mobile */}
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <nav className={styles.mobileMenu}>
          <Link href="#about" onClick={() => setIsOpen(false)}>Sobre</Link>
          <Link href="#portfolio" onClick={() => setIsOpen(false)}>Portfólio</Link>
          <Link href="#contact" onClick={() => setIsOpen(false)}>Contato</Link>

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