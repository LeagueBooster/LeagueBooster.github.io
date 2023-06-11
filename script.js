async function calculatePrice() {
  const currentContainer = document.querySelector('.container.current');
  const targetContainer = document.querySelector('.container.target');
  const currentRankInput = currentContainer.querySelector('.box img.selected');
  const targetRankInput = targetContainer.querySelector('.box img.selected');
  const priceDisplay = document.getElementById('price-display');
  const currencySelect = document.getElementById('currency-select');
  const selectedCurrency = currencySelect.value;

  if (!currentRankInput || !targetRankInput) {
    priceDisplay.textContent = 'Price: N/A';
    return;
  }

  const currentRank = parseInt(currentRankInput.alt.slice(-1));
  const targetRank = parseInt(targetRankInput.alt.slice(-1));

  // Define the price calculation logic based on the current and target ranks
  const prices = [
    [5, 25, 35, 79, 89],  // Prices for current rank 1
    [null, 19, 49, 69, 69],  // Prices for current rank 2
    [null, null, 29, 59, 69],  // Prices for current rank 3
    [null, null, null, 39, 69],  // Prices for current rank 4
    [null, null, null, null, 75]  // Prices for current rank 5
  ];

  const price = prices[currentRank - 1][targetRank - 1];

  // Perform currency conversion using API
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
  const data = await response.json();
  const conversionRate = data.rates[selectedCurrency];
  const convertedPrice = price * conversionRate;

  // Display the calculated price
  priceDisplay.textContent = `Price: ${convertedPrice ? convertedPrice.toFixed(2) + ' ' + selectedCurrency : 'N/A'}`;
}
