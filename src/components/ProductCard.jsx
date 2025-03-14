// Update the handleGoClick function in ProductCard.jsx
const handleGoClick = (url, e) => {
  e.preventDefault();
  e.stopPropagation();
  // Add URL protocol if missing
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  window.open(fullUrl, '_blank', 'noopener,noreferrer');
};