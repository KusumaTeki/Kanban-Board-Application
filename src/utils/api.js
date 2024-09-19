export const getTicketsFromAPI = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');  // Example API URL
    const data = await response.json();
    return data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
