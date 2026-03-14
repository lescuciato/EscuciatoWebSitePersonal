// ─── Steam API utility ───────────────────────────────────────────────────────
// Fetches owned games from the Steam Web API and returns the top played ones.
// Requires STEAM_API_KEY and STEAM_ID in .env (server-side only).

// App IDs to exclude (e.g. tools/utilities marked private on Steam)
const EXCLUDED_APPIDS = new Set([1388490]); // EVGA Precision X1

export interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;   // in minutes (may be undefined if not played recently)
  playtime_forever: number;  // in minutes
  img_icon_url: string;
}

/**
 * Returns the N most recently played games (last 2 weeks) via the Steam API.
 */
export async function getRecentlyPlayedGames(count = 5): Promise<SteamGame[]> {
  const apiKey = import.meta.env.STEAM_API_KEY;
  const steamId = import.meta.env.STEAM_ID;
  if (!apiKey || !steamId) return [];
  try {
    const res = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&count=${count}`
    );
    const data = await res.json();
    return data?.response?.games ?? [];
  } catch {
    return [];
  }
}

/**
 * Returns the top N games by all-time playtime from the user's Steam library.
 * Excludes games with zero playtime and any manually excluded app IDs.
 */
export async function getTopPlayedGames(count = 20): Promise<SteamGame[]> {
  const apiKey = import.meta.env.STEAM_API_KEY;
  const steamId = import.meta.env.STEAM_ID;

  if (!apiKey || !steamId) return [];

  try {
    const res = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`
    );
    const data = await res.json();
    const games: SteamGame[] = data?.response?.games ?? [];

    return games
      .filter((g) => g.playtime_forever > 0 && !EXCLUDED_APPIDS.has(g.appid))
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, count)
      .map((g) => ({ ...g, playtime_2weeks: g.playtime_2weeks ?? 0 }));
  } catch {
    return [];
  }
}

/** Full-size header image (460×215) from the Steam CDN. */
export function getCoverUrl(appid: number): string {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`;
}

/** Formats a playtime value in minutes to a human-readable string. */
export function formatPlaytime(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.round(minutes / 60);
  return `${hours}h`;
}
