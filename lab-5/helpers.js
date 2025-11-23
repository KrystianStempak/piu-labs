/**
 * @returns {string} 
 */
export const generateId = () => {
    return 'shape-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};

/**
 * @returns {string} 
 */
export const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`;
};