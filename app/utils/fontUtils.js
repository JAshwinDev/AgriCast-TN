// PASTE HERE - Create this new file
export const getFontClass = (level) => {
  const fontClasses = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-medium',
  };
  return fontClasses[level] || 'text-base';
};