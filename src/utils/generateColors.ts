/**
 * Функція для генерації унікальних кольорів HSL
 */
export const generateColor = (index: number) => {
  const hue = (index * 137) % 360;
  return `hsl(${hue}, 50%, 65%)`;
};
