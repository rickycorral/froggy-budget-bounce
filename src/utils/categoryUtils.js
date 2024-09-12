export const categoryColors = {
  Escuela: "bg-blue-500",
  Renta: "bg-purple-500",
  Servicios: "bg-yellow-500",
  Uber: "bg-black",
  Comida: "bg-red-500",
  Roma: "bg-pink-500",
  Otros: "bg-indigo-500",
  Medicinas: "bg-orange-500",
  Ahorros: "bg-green-500",
};

export const categoryIcons = {
  Escuela: "🎓",
  Renta: "🏠",
  Servicios: "🔌",
  Uber: "🚗",
  Comida: "🍽️",
  Roma: "🐕",
  Otros: "📦",
  Medicinas: "💊",
  Ahorros: "💰",
};

export const getCategoryLightColor = (category) => {
  const baseColor = categoryColors[category].split('-')[1];
  return `bg-${baseColor}-100 bg-opacity-50`;
};