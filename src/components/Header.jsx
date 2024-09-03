import React from 'react';

export const Header = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="bg-green-500 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
      <div className="flex-grow"></div>
      <h1 className="text-2xl font-bold text-center">RanaRe</h1>
      <div className="flex-grow flex justify-end">
        <img 
          src="/ranare1.png" 
          alt="RanaRe Logo" 
          className="h-8 w-auto cursor-pointer" 
          onClick={handleLogoClick}
        />
      </div>
    </header>
  );
};