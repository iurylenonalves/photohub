"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import Pagination from "./Pagination";
import CategoryFilter from "./CategoryFilter";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9; // Number of items per page
  const galleryRef = useRef<HTMLDivElement>(null);

  const portfolioImages: Record<string, { base: string }[]> = {
    all: 
    [
      { base: "tour01" }, { base: "tour02" }, { base: "tour03" }, 
      { base: "tour04" }, { base: "tour05" }, { base: "tour06" }, 
      { base: "tour07" }, { base: "tour08" }, { base: "tour09" }, 
      { base: "tour10" }, { base: "tour11" }, { base: "tour12" }, 
      { base: "tour13" }, { base: "tour14" }, { base: "tour15" },
      { base: "tour16" }, { base: "tour17" }, { base: "tour18" }, 
      { base: "tour19" }, { base: "work01" }, { base: "work02" }, 
      { base: "work03" }, { base: "work04" }, { base: "work05" }, 
      { base: "work06" }, { base: "work07" }, { base: "work08" }, 
      { base: "work09" }, { base: "work10" }, { base: "studio01" }, 
      { base: "studio02" }, { base: "studio03" }, { base: "studio04" }, 
      { base: "studio05" }, { base: "studio06" }, { base: "studio07" }, 
      { base: "studio08" },{ base: "studio09" }, { base: "studio10" }, 
      { base: "studio11" }
    ],
    tourism: 
    [
      { base: "tour10" }, { base: "tour11" }, { base: "tour12" }, 
      { base: "tour13" }, { base: "tour01" }, { base: "tour02" }, 
      { base: "tour03" }, { base: "tour04" }, { base: "tour05" }, 
      { base: "tour06" }, { base: "tour07" }, { base: "tour08" }, 
      { base: "tour09" }, { base: "tour14" }, { base: "tour15" }, 
      { base: "tour16" }, { base: "tour17" }, { base: "tour18" }, 
      { base: "tour19" }
    ],
    professional: 
    [
      { base: "work01" }, { base: "work02" }, { base: "work03" }, 
      { base: "work04" }, { base: "work05" }, { base: "work06" }, 
      { base: "work07" }, { base: "work08" }, { base: "work09" }, 
      { base: "work10" }
    ],
    studio: 
    [
      { base: "studio09" }, { base: "studio10" }, { base: "studio11" },
      { base: "studio01" }, { base: "studio02" }, { base: "studio03" }, 
      { base: "studio04" }, { base: "studio05" }, { base: "studio06" }, 
      { base: "studio07" }, { base: "studio08" }
    ],
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredImages = portfolioImages[selectedCategory as keyof typeof portfolioImages];
  
  // Paginations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  // Scroll to top when changing pages
  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth"})
    }
  }, [currentPage]);

  return (
    <section className="py-16 px-6 bg-white scroll-mt-16" id="portfolio" ref={galleryRef}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8" data-aos="fade-up">
          Meu Portfólio
        </h2>

        {/* Filter Category */}
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />

        {/* Filtered Galery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {paginatedImages.map(({ base }, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => setSelectedIndex(startIndex + index)}
            >
              <Image
                src={`/images/${base}-thumbnail.webp`}
                alt={`Portfolio image ${index + 1}`}
                width={500}
                height={400}
                className="w-full h-72 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center">
                <span className="text-white text-lg font-semibold">Ver detalhes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={filteredImages.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <Modal
          images={filteredImages.map(({ base }) => `/images/${base}-large.webp`)}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;