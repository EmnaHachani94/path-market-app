import { API_BASE_URL } from "../config/Api";

export type RegisterPayload = {
  pseudo: string;
  adresseEmail: string;
  motDePasse: string;
  dateDeNaissance: string; // "YYYY-MM-DD"
};

export async function register(payload: RegisterPayload): Promise<number> {
  const res = await fetch(`${API_BASE_URL}/api/rest/user/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Register failed (${res.status}): ${text}`);
  }

  return (await res.json()) as number; // id utilisateur
}
