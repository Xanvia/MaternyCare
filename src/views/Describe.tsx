import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  return (
    <header className="bg-gray-200 py-4 text-center">
      <h1 className="text-xl font-bold">Your Daily Well-being App</h1>
    </header>
  );
};

const Content = () => {
  return (
    <div className="text-center px-4">
      <p className="mb-4">
        Your personalised Yoga and Meal Plan. Tracks your progress and gives you
        recommendations based on past data set. Sets you up for improvement. Get
        healthy and fuel greatness with Aloha.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Get Started</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">How it Works?</button>
      </div>
    </div>
  );
};

const PhoneContainer = () => {
  return (
    <div className="text-center">
      <img className="mx-auto w-48" src="phone.jpg" alt="Phone" />
      <p className="mt-2">16.5kcal</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 text-center">
      <p>Do It!</p>
    </footer>
  );
};

const Describe = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow justify-center items-center px-4">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Content />
        </div>
        <div className="w-full md:w-1/2">
          <PhoneContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Describe;
