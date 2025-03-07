"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/modal.module.css";

interface ModalProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
}

const Modal = ({ images, selectedIndex, onClose }: ModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  // Atualiza a imagem quando uma nova modal é aberta
  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className={styles.modalWrapper}>
      <button className={styles.closeButton} onClick={onClose}>
        ✖
      </button>

      <button className={`${styles.navButton} ${styles.navButtonLeft}`} onClick={handlePrev}>
        ◀
      </button>

      <div className={`${styles.imageWrapper} ${styles.scrollbarWrapper}`}>
        <Image
          src={images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
          layout="intrinsic"  // Usando layout "intrinsic" para manter a proporção natural
          width={1200}  // Largura padrão
          height={800}  // Altura padrão
          objectFit="contain"  // Usando contain para não distorcer a imagem
          className="rounded-lg"
        />
      </div>

      <button className={`${styles.navButton} ${styles.navButtonRight}`} onClick={handleNext}>
        ▶
      </button>
    </div>
  );
};

export default Modal;