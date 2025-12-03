// zodiac signs
const signs = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

// elements
const signSelect = document.getElementById("signSelect");
const horoscopeText = document.getElementById("horoscopeText");
const accent = document.getElementById("accent");
const dateLabel = document.getElementById("dateLabel");

// fill dropdown
signs.forEach(sign => {
  const opt = document.createElement("option");
  opt.value = sign;
  opt.textContent = sign;
  signSelect.appendChild(opt);
});

// load saved sign
const savedSign = localStorage.getItem("horoscopeSign");
if (savedSign) signSelect.value = savedSign;

// load horoscope from API Ninjas
async function loadHoroscope(sign = "aries") {
  horoscopeText.textContent = "checking the stars…";
  dateLabel.textContent = "";

  localStorage.setItem("horoscopeSign", sign);

  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/horoscope?sign=${sign}`, {
      headers: { 'X-Api-Key': 'YOUR_API_KEY_HERE' }
    });

    const data = await res.json();

    // API Ninjas returns: data.sign, data.horoscope, data.date
    // Display them properly
    horoscopeText.innerHTML = `<strong>${data.sign}</strong>: ${data.horoscope}`;
    dateLabel.textContent = data.date; // show date returned by API

  } catch (err) {
    console.error(err);
    horoscopeText.textContent = "couldn't load your horoscope ✨";
  }
}

// theme buttons
document.querySelectorAll(".themes button").forEach(btn => {
  btn.style.background = btn.dataset.theme;
  btn.addEventListener("click", () => {
    const color = btn.dataset.theme;
    accent.style.background = color;
    localStorage.setItem("horoscopeTheme", color);
  });
});

// load saved theme
const savedTheme = localStorage.getItem("horoscopeTheme");
if (savedTheme) accent.style.background = savedTheme;

// initial load
loadHoroscope(signSelect.value || "aries");

// update on change
signSelect.addEventListener("change", () => {
  loadHoroscope(signSelect.value);
});
