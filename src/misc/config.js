const API_BASE_URL = 'https://api.tvmaze.com/';

export async function GetApiResults(query) {
  const r = await fetch(`${API_BASE_URL}${query}`);
  const resp = await r.json();
  return resp;
}
