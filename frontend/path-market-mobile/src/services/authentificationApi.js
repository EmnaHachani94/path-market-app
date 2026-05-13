import { API_BASE_URL } from "../config/Api";
import { saveAuthSession } from "./tokenStorage";

function frSlashToDash(fr) {
  const [dd, mm, yyyy] = fr.trim().split("/");
  if (!dd || !mm || !yyyy) throw new Error("Date invalide (JJ/MM/AAAA)");
  return `${dd}-${mm}-${yyyy}`;
}

export async function registerUser({ nom, email, password, dateNaissance }) {
  const payload = {
    pseudo: nom.trim(),
    adresseEmail: email.trim(),
    motDePasse: password,
    dateDeNaissance: frSlashToDash(dateNaissance),
  };

  const url = `${API_BASE_URL}/api/rest/user/create`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw data || { message: `HTTP ${res.status}` };
  }

  return data;
}

/**
 * Appelle /api/rest/auth/login et sauvegarde accessToken dans AsyncStorage.
 */
export async function loginUser({ adresseEmail, motDePasse }) {
  const payload = {
    adresseEmail: adresseEmail.trim(),
    motDePasse,
  };

  const res = await fetch(`${API_BASE_URL}/api/rest/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await res.text().catch(() => "");
  let json = null;
  try {
    json = raw ? JSON.parse(raw) : null;
  } catch {
    // ignore
  }

  if (!res.ok) {
    const msg =
      json?.message ||
      (res.status === 401
        ? "Email ou mot de passe incorrect"
        : raw || `Erreur (${res.status})`);
    throw new Error(msg);
  }

  const data = json ?? {};
  //saveAuthSession permet de stocker accessToken et UserId
  if (data?.accessToken && data?.userId != null) {
    await saveAuthSession({
      accessToken: data.accessToken,
      userId: data.userId,
    });
  } else {
    console.warn("LOGIN: pas de accessToken dans la réponse");
  }

  return data; // { userId, pseudo, adresseEmail, accessToken }
}
