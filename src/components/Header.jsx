import React from 'react';
import logo from '../../src/rarare1.png'; // Import the image

export const Header = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="relative bg-green-500 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
      <h1 className="absolute left-0 right-0 text-4xl font-bold text-center">
        RanaRe
      </h1>
      <div className="flex-grow flex justify-end">
        <img 
          src={logo} // Use the imported image
          alt="RanaRe Logo" 
          className="h-16 w-auto cursor-pointer" 
          onClick={handleLogoClick}
        />
      </div>
    </header>
  );
};
