// zodiac signs
const signs = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

const horoscopeURLs = {
  aries: "https://api.api-ninjas.com/v1/horoscope?zodiac=aries",
  taurus: "https://api.api-ninjas.com/v1/horoscope?zodiac=taurus",
  gemini: "https://api.api-ninjas.com/v1/horoscope?zodiac=gemini",
  cancer: "https://api.api-ninjas.com/v1/horoscope?zodiac=cancer",
  leo: "https://api.api-ninjas.com/v1/horoscope?zodiac=leo",
  virgo: "https://api.api-ninjas.com/v1/horoscope?zodiac=virgo",
  libra: "https://api.api-ninjas.com/v1/horoscope?zodiac=libra",
  scorpio: "https://api.api-ninjas.com/v1/horoscope?zodiac=scorpio",
  sagittarius: "https://api.api-ninjas.com/v1/horoscope?zodiac=sagittarius",
  capricorn: "https://api.api-ninjas.com/v1/horoscope?zodiac=capricorn",
  aquarius: "https://api.api-ninjas.com/v1/horoscope?zodiac=aquarius",
  pisces: "https://api.api-ninjas.com/v1/horoscope?zodiac=pisces"
};

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

// load saved theme
const savedTheme = localStorage.getItem("horoscopeTheme");
if (savedTheme) accent.style.background = savedTheme;

// function to load horoscope for a specific sign
async function loadHoroscope(sign = "aries") {
  horoscopeText.textContent = "checking the stars…";
  dateLabel.textContent = "";

  try {
    localStorage.setItem("horoscopeSign", sign);

    const res = await fetch(horoscopeURLs[sign], {
      method: 'GET',
      headers: { "X-Api-Key": "blbTUv2CVt9YgApgn2mioA==nKrg5ySEuPnb5cPE" }
    });

    const data = await res.json();

    // API Ninjas returns only "horoscope"
    horoscopeText.innerHTML = `<strong>${sign}</strong>: ${data.horoscope}`;
    dateLabel.textContent = new Date().toLocaleDateString();

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
    try { localStorage.setItem("horoscopeTheme", color); } catch(e) {}
  });
});

// initial load
loadHoroscope(signSelect.value || "aries");

// update on dropdown change
signSelect.addEventListener("change", () => {
  loadHoroscope(signSelect.value);
});
