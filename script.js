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

async function loadHoroscope(sign = "aries") {
  horoscopeText.textContent = "checking the stars…";

  try {
    const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
      method: "POST"
    });

    const data = await res.json();

    horoscopeText.textContent = data.description;
    dateDisplay.textContent = data.current_date;

  } catch (err) {
    horoscopeText.textContent = "couldn't load your horoscope ✨";
  }
}

// default load
loadHoroscope("aries");

signSelect.addEventListener("change", () => {
  loadHoroscope(signSelect.value);
});
