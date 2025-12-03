export default async function handler(req, res) {
  const sign = req.query.sign || "aries";

  try {
    const apiRes = await fetch(`https://api.api-ninjas.com/v1/horoscope?sign=${sign}`, {
      method: 'GET',
      headers: { 'X-Api-Key': 'blbTUv2CVt9YgApgn2mioA==nKrg5ySEuPnb5cPE' }
    });

    const data = await apiRes.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch horoscope" });
  }
}
