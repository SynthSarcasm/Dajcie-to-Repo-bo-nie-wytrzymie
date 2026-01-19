
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Dzień dobry";
  if (hour >= 12 && hour < 18) return "Miłego popołudnia";
  return "Dobry wieczór";
};

export const formatDate = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) return "Przed chwilą";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min temu`;
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    if (hours === 1) return "Godzinę temu";
    return `${hours} godz. temu`;
  }
  
  return new Date(timestamp).toLocaleDateString('pl-PL', { 
    day: '2-digit', 
    month: 'long' 
  });
};
