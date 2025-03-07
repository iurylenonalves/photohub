"use client";

import { useState } from "react";
import Link from "next/link";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import footerStyles from "../../styles/footer.module.css"; // Referência correta ao arquivo CSS

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Certifique-se de que useState foi importado

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <p className={footerStyles.text}>© 2025 Bruna Alves. Todos os direitos reservados.</p>
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
          {/* <a
            href="https://www.facebook.com/nomedafotografa"
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyles.link}
          >
            Facebook
          </a> */}
        </div>
      </div>

      {isModalOpen && <PrivacyPolicyModal onClose={handleCloseModal} />}
    </footer>
  );
};

export default Footer;