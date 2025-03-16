"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/modal.module.css";
import { useTranslations } from "@/context/TranslationContext";

// Modal props
interface ModalProps {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
}

// Modal component
const Modal = ({ images, selectedIndex, onClose }: ModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const { translations } = useTranslations();

  // Update the current index when the selected index changes
  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex]);

  // Handle the previous and next button
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Navigate with the arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev, onClose]);

  return (
    <div className={styles.modalWrapper}>
      <button className={styles.closeButton} 
        onClick={onClose} 
        aria-label={translations.modalArialLabelClose}
      >
        ✖
      </button>

      <button className={`${styles.navButton} ${styles.navButtonLeft}`} 
        onClick={handlePrev}
        aria-label={translations.modalArialLabelPrevious}
      >
        ◀
      </button>

      <div className={`${styles.imageWrapper} ${styles.scrollbarWrapper}`}>
        <Image
          src={images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
          layout="intrinsic"  
          width={1200}
          height={800}
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      <button className={`${styles.navButton} ${styles.navButtonRight}`} 
        onClick={handleNext}
        aria-label={translations.modalArialLabelNext}
      >
        ▶
      </button>
    </div>
  );
};

export default Modal;