import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { categoryColors, categoryIcons } from "../utils/categoryUtils";

const romaImages = [
  "/romina.jpg",
  "/romina2.jpg",
  "/romina3.jpg",
  "/romina4.jpg",
  "/romina5.jpg",
  "/romina6.jpg",
  "/romina7.jpg",
  "/romina8.jpg",
  "/romina9.jpg",
  "/romina10.jpg",
  "/romina11.jpg",
  "/romina12.jpg",
  "/romina13.jpg",
  "/romina14.jpg",
  "/romina15.jpg",
];

const romaBackground = `url('/rominaback.jpeg')`;

export const RomaCard = ({ isExpanded, onExpand }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % romaImages.length);
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full ${isExpanded ? "h-auto" : "h-24"}`}
    >
      <Card
        className={`w-full bg-white border-blue-300 bg-opacity-90 shadow-lg overflow-hidden ${
          isExpanded ? "h-auto" : "h-24"
        }`}
        style={{
          backgroundImage: isExpanded ? "none" : romaBackground,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CardHeader className="flex flex-col items-center space-y-2 p-2">
          <div className="flex items-center justify-between w-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 ${categoryColors.Roma} rounded-full flex items-center justify-center cursor-pointer`}
              onClick={onExpand}
            >
              {categoryIcons.Roma}
            </motion.div>
            <CardTitle className="text-2xl font-extrabold text-center flex-grow gradient-text">
              Roma
            </CardTitle>
          </div>
          <p className="text-lg font-extrabold gradient-text">
            Te amamos Romina!
          </p>
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

