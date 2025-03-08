"use client";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = {
  all: "Todos",
  tourism: "Turístico",
  professional: "Profissional",
  studio: "Estúdio",
};

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-8 flex-wrap justify-center gap-2 md:gap-4" data-aos="fade-up">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          className={`px-3 py-2 font-semibold text-lg cursor-pointer rounded-md transition-all ${
            selectedCategory === key ? "text-primary" : "text-gray-600" 
          }`}
          onClick={() => onSelectCategory(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;