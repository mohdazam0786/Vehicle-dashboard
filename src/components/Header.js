import React from "react";

const Header = () => {
  return (
    <>
      <div className="h-16 bg-black border-b-4 border-sky-300 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h1 className="font-mono bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent text-center">
          Vehicle Store
        </h1>
      </div>
    </>
  );
};

export default Header;
