import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "auth_user_id";

export async function saveAuthSession({ accessToken, userId }) {
  if (accessToken) await AsyncStorage.setItem(TOKEN_KEY, accessToken);
  if (userId != null) await AsyncStorage.setItem(USER_ID_KEY, String(userId));
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getUserId() {
  const v = await AsyncStorage.getItem(USER_ID_KEY);
  return v ? Number(v) : null;
}

export async function clearSession() {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_ID_KEY]);
}
