import { API_BASE_URL } from "../config/Api";

function frSlashToDash(fr) {
  const [dd, mm, yyyy] = fr.trim().split("/");
  if (!dd || !mm || !yyyy) throw new Error("Date invalide (JJ/MM/AAAA)");
  return `${dd}-${mm}-${yyyy}`; // ✅ correspond à dd-MM-yyyy
}
export async function registerUser({ nom, email, password, dateNaissance }) {
  const payload = {
    pseudo: nom.trim(),
    adresseEmail: email.trim(),
    motDePasse: password,
    dateDeNaissance: frSlashToDash(dateNaissance), // on convertira ensuite si besoin
  };

  const url = `${API_BASE_URL}/api/rest/user/create`;

  console.log("REGISTER URL:", url);
  console.log("REGISTER PAYLOAD:", payload);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json().catch(() => res.text());
}
