import React, { useState } from "react";
import { categories } from "../data/Data";

const MotherGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categories[0].name);

  return (
    <div className="mx-10">
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {categories.map((category, index) => (
          <button
            key={index}
            type="button"
            className={`px-4 py-2 m-2 font-medium text-sm rounded-md ${
              category.name === activeTab
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            }`}
            onClick={() => setActiveTab(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div>
        {categories
          .filter((category) => category.name === activeTab)
          .map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-3 animate-fade-in"
            >
              {category.content.map((item, index) => (
                <div key={index} className="p-4">
                  <img
                    src={item.img}
                    alt="category"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                  <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                  <p className="text-sm mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MotherGuide;
