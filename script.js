const signs = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const signSelect = document.getElementById("signSelect");
const horoscopeText = document.getElementById("horoscopeText");
const dateDisplay = document.getElementById("dateDisplay");

// Fill dropdown
signs.forEach(sign => {
  const opt = document.createElement("option");
  opt.value = sign;
  opt.textContent = sign;
  signSelect.appendChild(opt);
});

async function loadHoroscope(sign) {
  horoscopeText.textContent = "checking the stars…";

  try {
    const res = await fetch(`https://horoscopefree.com/api/v1/forecast/${sign}/today`);
    const data = await res.json();

    horoscopeText.textContent = data.horoscope;
    dateDisplay.textContent = data.date;
  } catch (error) {
    horoscopeText.textContent = "couldn't load your horoscope ✨";
  }
}

// Load default
loadHoroscope("aries");

// Listen for user changes
signSelect.addEventListener("change", () => {
  loadHoroscope(signSelect.value);
});
