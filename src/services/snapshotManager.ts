import { ComparisonResult, Snapshot, SnapshotDiff } from '@/src/types/instagram';
import { getItem, setItem, StorageKeys } from './storage';

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function loadSnapshots(): Promise<Snapshot[]> {
  return (await getItem<Snapshot[]>(StorageKeys.snapshots)) ?? [];
}

export async function saveSnapshot(
  result: ComparisonResult,
  accountHandle?: string,
): Promise<Snapshot> {
  const snapshot: Snapshot = {
    id: uid(),
    createdAt: Date.now(),
    accountHandle,
    followingCount: result.followingCount,
    followersCount: result.followersCount,
    followingUsernames: [
      ...result.notFollowingBack.map((u) => u.username),
      ...result.mutual.map((u) => u.username),
    ],
    followersUsernames: [
      ...result.youDontFollowBack.map((u) => u.username),
      ...result.mutual.map((u) => u.username),
    ],
  };

  const existing = await loadSnapshots();
  const updated = [snapshot, ...existing].slice(0, 50);
  await setItem(StorageKeys.snapshots, updated);
  return snapshot;
}

export async function deleteSnapshot(id: string): Promise<void> {
  const existing = await loadSnapshots();
  await setItem(
    StorageKeys.snapshots,
    existing.filter((s) => s.id !== id),
  );
}

export function diffSnapshots(before: Snapshot, after: Snapshot): SnapshotDiff {
  const beforeFollowers = new Set(before.followersUsernames);
  const afterFollowers = new Set(after.followersUsernames);
  const beforeFollowing = new Set(before.followingUsernames);
  const afterFollowing = new Set(after.followingUsernames);

  return {
    newFollowers: [...afterFollowers].filter((u) => !beforeFollowers.has(u)),
    lostFollowers: [...beforeFollowers].filter((u) => !afterFollowers.has(u)),
    newFollowing: [...afterFollowing].filter((u) => !beforeFollowing.has(u)),
    stoppedFollowing: [...beforeFollowing].filter((u) => !afterFollowing.has(u)),
  };
}
