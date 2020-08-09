const formatCurrency = (amount) => {
  if (isNaN(amount)) {
    return null;
  }

  return `$${amount.toFixed(2)}`;
};

export default {
  formatCurrency,
};
