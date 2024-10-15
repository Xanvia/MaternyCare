import React, { useState } from "react";
import { categories } from "../data/Data";
import AddGuide from "../modals/AddGuide";

const MotherGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState(categories[0].name);

  return (
    <div className="mx-10">
      <div className="flex items-center justify-between py-4 md:py-8 flex-wrap">
        .
        <div className="flex items-center flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              type="button"
              className={`px-4 py-2 m-2 font-medium text-sm rounded-md ${
                category.name === activeTab
                  ? "bg-blue_primary text-white"
                  : "bg-white text-blue_primary border border-blue_primary"
              }`}
              onClick={() => setActiveTab(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <AddGuide />
        </div>
      </div>
      <div>
        {categories
          .filter((category) => category.name === activeTab)
          .map((category) => (
            <div
              key={category.name}
              className="grid llg:grid-cols-3 ss:grid-cols-2 grid-cols-1 animate-fade-in"
            >
              {category.content.map((item, index) => (
                <div
                  key={index}
                  className="ss:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4"
                >
                  <a href={`/guide/singlepost/${item.id}`}>
                    <img
                      className="rounded-t-lg"
                      src={item.img}
                      alt="category"
                    />
                  </a>
                  <div className="p-5">
                    <a href={`/guide/singlepost/${item.id}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.subtitle}
                    </p>
                    <a
                      href={`/guide/singlepost/${item.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue_primary rounded-lg hover:bg-blue_secondary focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MotherGuide;
