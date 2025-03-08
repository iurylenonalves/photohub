"use client";

import { useState } from "react";
import Link from "next/link";

import PrivacyPolicyModal from "./PrivacyPolicyModal";

import footerStyles from "../../styles/footer.module.css";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>       
        <div className={footerStyles.links}>
          <Link href="#about" className={footerStyles.link}>
            Sobre
          </Link>
          <Link href="#contact" className={footerStyles.link}>
            Contato
          </Link>
          <button onClick={handleOpenModal} className={footerStyles.link}>
            Política de Privacidade
          </button>
          <a
            href="https://www.instagram.com/brunaalvesphoto/"
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyles.link}
          >
            Instagram
          </a>
          <p className={footerStyles.text}>© 2025 Bruna Alves. Todos os direitos reservados.</p>
        </div>
      </div>

      {isModalOpen && <PrivacyPolicyModal onClose={handleCloseModal} />}
    </footer>
  );
};

export default Footer;