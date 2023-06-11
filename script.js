function selectRank(container, rank) {
  const currentContainer = document.querySelector('.container.current');
  const targetContainer = document.querySelector('.container.target');

  if (container === 'current') {
    const currentImages = currentContainer.querySelectorAll('.box img');
    currentImages.forEach(img => {
      img.classList.remove('selected');
    });
    currentImages[rank - 1].classList.add('selected');
    document.getElementById('currentRank').value = rank;
  } else if (container === 'target') {
    const targetImages = targetContainer.querySelectorAll('.box img');
    targetImages.forEach(img => {
      img.classList.remove('selected');
    });
    targetImages[rank - 1].classList.add('selected');
    document.getElementById('targetRank').value = rank;
  }

  // Check if both current and target ranks are selected
  const currentSelected = currentContainer.querySelector('.box img.selected');
  const targetSelected = targetContainer.querySelector('.box img.selected');
  const submitButton = document.getElementById('submit-button');

  if (currentSelected && targetSelected) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }

  calculatePrice();
}

// Replace the existing calculatePrice() function with the updated code

async function calculatePrice() {
  const currentContainer = document.querySelector('.container.current');
  const targetContainer = document.querySelector('.container.target');
  const currentRankInput = currentContainer.querySelector('.box img.selected');
  const targetRankInput = targetContainer.querySelector('.box img.selected');
  const priceInput = document.getElementById('price');
  const currencyInput = document.getElementById('currency');
  const selectedCurrency = currencyInput.value;

  if (!currentRankInput || !targetRankInput) {
    priceInput.value = '';
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

  // Update the hidden price and currency inputs
  priceInput.value = convertedPrice ? convertedPrice.toFixed(2) : '';
  currencyInput.value = selectedCurrency;
}

function submitForm(event) {
  event.preventDefault(); // Prevent form submission

  const emailInput = document.getElementById('email');
  const phoneNumberInput = document.getElementById('phone');
  const facebookInput = document.getElementById('facebook');
  const summonerInput = document.getElementById('summoner');
  const currentRankInput = document.getElementById('currentRank');
  const targetRankInput = document.getElementById('targetRank');
  const regionInput = document.getElementById('region');

  // Check if any of the required fields are empty
  if (
    emailInput.value.trim() === '' ||
    phoneNumberInput.value.trim() === '' ||
    facebookInput.value.trim() === '' ||
    summonerInput.value.trim() === '' ||
    (currentRankInput.value.trim() === '' || currentRankInput.value.trim() === 'current') ||
    (targetRankInput.value.trim() === '' || targetRankInput.value.trim() === 'target') ||
    regionInput.value.trim() === ''
  ) {
    alert('Please fill in all the required fields and select ranks and region.');
    return; // Stop further execution
  }

  // Form validation passed, submit the form
  document.getElementById('purchase-form').submit();
}

// Add event listeners
const currentImages = document.querySelectorAll('.container.current .box img');
const targetImages = document.querySelectorAll('.container.target .box img');
const submitButton = document.getElementById('submit-button');

currentImages.forEach((img, rank) => {
  img.addEventListener('click', () => {
    selectRank('current', rank + 1);
  });
});

targetImages.forEach((img, rank) => {
  img.addEventListener('click', () => {
    selectRank('target', rank + 1);
  });
});

submitButton.addEventListener('click', submitForm);
