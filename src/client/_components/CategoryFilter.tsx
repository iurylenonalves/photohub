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
    <div className="mb-8 flex justify-center space-x-4">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          className={`px-4 py-2 font-semibold text-lg ${
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