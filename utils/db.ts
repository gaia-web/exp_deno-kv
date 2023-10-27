/// <reference lib="deno.unstable" />

import { APP_CONFIG } from "./app-config.ts";

export let db: Deno.Kv;

export async function initializeDB() {
  db = await Deno.openKv(APP_CONFIG.DB_PATH);
  return db;
}

export function resolveKeyPath(base: string[], unresolved: string[]) {
  return base.concat(unresolved).filter(Boolean);
}

export function checkIfKeyIsValid(key: string[]) {
  return key.every(checkIfKeyPartIsValid);
}

export function checkIfKeyPartIsValid(keyPart: string) {
  if (!keyPart) return false;
  if (keyPart.startsWith("$")) return false;
  return true;
}
