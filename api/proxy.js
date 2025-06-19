export default async function handler(req, res) {
  const { domain } = req.query;
  if (!domain || !domain.startsWith('http')) {
    return res.status(400).send('Ungültige Domain.');
  }

  const target = `https://llmstxt.firecrawl.dev/${encodeURIComponent(domain)}`;
  try {
    const result = await fetch(target);
    const data = await result.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Fehler beim Abrufen: ' + err.message);
  }
}
