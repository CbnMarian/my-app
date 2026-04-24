import JSZip from 'jszip';
import {
  ComparisonResult,
  FollowersFile,
  FollowingFile,
  IgUser,
  InstagramFollowEntry,
} from '@/src/types/instagram';

const FOLLOWERS_PATH_PATTERN = /followers(_\d+)?\.json$/i;
const FOLLOWING_PATH_PATTERN = /following\.json$/i;

function entryToUser(entry: InstagramFollowEntry): IgUser | null {
  const data = entry.string_list_data?.[0];
  if (!data) return null;
  return {
    username: data.value,
    profileUrl: data.href,
    followedAt: data.timestamp,
  };
}

async function readJsonFromZip<T>(zip: JSZip, filename: string): Promise<T | null> {
  const file = zip.file(filename);
  if (!file) return null;
  const content = await file.async('string');
  return JSON.parse(content) as T;
}

export async function parseInstagramZip(zipBytes: ArrayBuffer): Promise<ComparisonResult> {
  const zip = await JSZip.loadAsync(zipBytes);

  const followerFiles: string[] = [];
  let followingFile: string | null = null;

  zip.forEach((relativePath) => {
    if (FOLLOWERS_PATH_PATTERN.test(relativePath)) followerFiles.push(relativePath);
    if (FOLLOWING_PATH_PATTERN.test(relativePath)) followingFile = relativePath;
  });

  if (!followingFile) {
    throw new Error('Nu am găsit fișierul following.json în arhivă. Verifică că ai descărcat JSON, nu HTML.');
  }
  if (followerFiles.length === 0) {
    throw new Error('Nu am găsit fișierul followers.json în arhivă.');
  }

  const followingJson = await readJsonFromZip<FollowingFile>(zip, followingFile);
  const followingEntries = followingJson?.relationships_following ?? [];

  const followerEntries: InstagramFollowEntry[] = [];
  for (const path of followerFiles) {
    const data = await readJsonFromZip<FollowersFile>(zip, path);
    if (Array.isArray(data)) followerEntries.push(...data);
  }

  const followingUsers = followingEntries.map(entryToUser).filter(Boolean) as IgUser[];
  const followerUsers = followerEntries.map(entryToUser).filter(Boolean) as IgUser[];

  const followerUsernames = new Set(followerUsers.map((u) => u.username));
  const followingUsernames = new Set(followingUsers.map((u) => u.username));

  const notFollowingBack = followingUsers
    .filter((u) => !followerUsernames.has(u.username))
    .sort((a, b) => a.username.localeCompare(b.username));

  const youDontFollowBack = followerUsers
    .filter((u) => !followingUsernames.has(u.username))
    .sort((a, b) => a.username.localeCompare(b.username));

  const mutual = followingUsers
    .filter((u) => followerUsernames.has(u.username))
    .sort((a, b) => a.username.localeCompare(b.username));

  return {
    notFollowingBack,
    youDontFollowBack,
    mutual,
    followingCount: followingUsers.length,
    followersCount: followerUsers.length,
    generatedAt: Date.now(),
  };
}
