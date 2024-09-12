import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { categoryColors, categoryIcons } from "../utils/categoryUtils";

const romaImages = [
  '/src/romina.jpg',
  '/src/romina2.jpg',
  '/src/romina3.jpg',
  '/src/romina4.jpg',
  '/src/romina5.jpg',
  '/src/romina6.jpg',
  '/src/romina7.jpg',
  '/src/romina8.jpg',
  '/src/romina9.jpg',
  '/src/romina10.jpg',
  '/src/romina11.jpg',
  '/src/romina12.jpg',
  '/src/romina13.jpg',
  '/src/romina14.jpg',
  '/src/romina15.jpg',
];

const romaBackground = `
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M12.5 10c-2.65 0-5.05.99-6.9 2.6L3 14.5 1.5 17c-1.65 2.88-2.17 6.79-1.37 10.9 1.5 7.8 5.37 16.54 12.03 22.67C19.9 57.1 29.7 60 40.5 60c2.65 0 5.2-.2 7.5-.6-2.69 1.06-5.55 1.62-8.5 1.62-8.68 0-16.22-3.68-22.09-9.86C11.1 44.55 7.03 35.56 6.93 26c-.07-7.44 2.52-14.28 7.57-19.7 2.71-2.89 5.97-5.28 9.7-7.1C19.5 1.5 14.74 4.5 12.5 10z' fill='%23ADD8E6' fill-opacity='0.4'/%3E%3C/svg%3E"),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M54.627 13.87l-5.909-5.909c-1.17-1.17-3.073-1.17-4.243 0l-4.242 4.242 10.152 10.152 4.242-4.242c1.17-1.17 1.17-3.073 0-4.243zM12.97 43.273l-3.182 9.546 9.546-3.182 29.09-29.09-6.364-6.364-29.09 29.09zm41.818-14.545L41.455 15.39l3.182-3.182 13.333 13.333-3.182 3.182z' fill='%23FFB6C1' fill-opacity='0.4'/%3E%3C/svg%3E")
`;

export const RomaCard = ({ isExpanded, onExpand }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % romaImages.length);
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full ${isExpanded ? 'h-auto' : 'h-28'}`}
    >
      <Card className={`w-full bg-white border-blue-300 bg-opacity-90 shadow-lg overflow-hidden ${isExpanded ? 'h-auto' : 'h-28'}`}
           style={{ backgroundImage: romaBackground }}>
        <CardHeader className="flex flex-col items-center space-y-2 p-2 bg-blue-100">
          <div className="flex items-center justify-between w-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 ${categoryColors.Roma} rounded-full flex items-center justify-center cursor-pointer`}
              onClick={onExpand}
            >
              {categoryIcons.Roma}
            </motion.div>
            <CardTitle className="text-gray-800 font-bold text-center flex-grow text-sm">
              Roma
            </CardTitle>
          </div>
          <p className="text-xs font-semibold text-blue-600">Te amamos Romina</p>
        </CardHeader>
        {isExpanded && (
          <CardContent className="p-1">
            <div className="mb-2">
              <img 
                src={romaImages[currentImageIndex]} 
                alt="Romina" 
                className="w-full h-auto rounded-lg cursor-pointer" 
                onClick={handleImageClick}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};