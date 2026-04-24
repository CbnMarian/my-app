/**
 * TypeScript types for Instagram data export.
 *
 * Reference: ZIP format from Instagram's "Download Your Information" feature
 * (Settings → Accounts Center → Your information and permissions → Download your information)
 * JSON format, under `connections/followers_and_following/`
 */

export type InstagramTimestamp = number;

export type InstagramStringListData = {
  href: string;
  value: string;
  timestamp: InstagramTimestamp;
};

export type InstagramFollowEntry = {
  title: string;
  media_list_data: unknown[];
  string_list_data: InstagramStringListData[];
};

export type FollowersFile = InstagramFollowEntry[];

export type FollowingFile = {
  relationships_following: InstagramFollowEntry[];
};

export type IgUser = {
  username: string;
  profileUrl: string;
  followedAt: InstagramTimestamp;
};

export type ComparisonResult = {
  notFollowingBack: IgUser[];
  youDontFollowBack: IgUser[];
  mutual: IgUser[];
  followingCount: number;
  followersCount: number;
  generatedAt: number;
};

export type Snapshot = {
  id: string;
  createdAt: number;
  accountHandle?: string;
  followingCount: number;
  followersCount: number;
  followingUsernames: string[];
  followersUsernames: string[];
};

export type SnapshotDiff = {
  newFollowers: string[];
  lostFollowers: string[];
  newFollowing: string[];
  stoppedFollowing: string[];
};
