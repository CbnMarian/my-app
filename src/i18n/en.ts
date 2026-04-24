import type { TranslationKeys } from './ro';

export const en: TranslationKeys = {
  common: {
    appName: 'Unfollow',
    tagline: "Find out who doesn't follow you back",
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    save: 'Save',
    delete: 'Delete',
    share: 'Share',
    export: 'Export',
    loading: 'Loading...',
    processing: 'Processing...',
    error: 'Error',
    retry: 'Try again',
  },
  home: {
    heroTitleLine1: 'See who',
    heroTitleLine1Italic: "doesn't",
    heroTitleLine2: 'follow you back.',
    heroSubtitle: 'Safe import, no password, 100% on your device.',
    importButton: 'Import archive',
    howItWorks: 'Three simple steps',
    stepOneTitle: 'Download your data',
    stepOneBody:
      'Instagram → Settings → Accounts Center → Download your information (JSON format).',
    stepTwoTitle: 'Wait for email',
    stepTwoBody:
      'Instagram emails you a ZIP archive, usually under 30 minutes.',
    stepThreeTitle: 'Import in app',
    stepThreeBody: 'Tap the button above and pick the ZIP file. Instant analysis.',
  },
  results: {
    notFollowingBack: 'Not following back',
    youDontFollowBack: "You don't follow",
    mutual: 'Mutual',
    empty: 'No results',
    searchPlaceholder: 'Search username...',
    followingCount: 'following',
    followersCount: 'followers',
  },
  history: {
    title: 'History',
    empty: 'No snapshots saved yet',
    emptyHint: 'Import an archive to save your first snapshot.',
    createdAt: 'Created at',
    deleteConfirm: 'Delete this snapshot?',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    upgradePro: 'Upgrade to Pro',
    privacy: 'Privacy',
    terms: 'Terms',
    about: 'About',
    version: 'Version',
    clearData: 'Clear all data',
  },
  languages: {
    label: 'Language',
    en: 'English',
    ro: 'Română',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
  },
  help: {
    title: 'Help',
    subtitle: 'How to export your Instagram data',
    intro:
      'Instagram lets you export only your followers list as JSON, without downloading everything. Five steps, takes 5–30 minutes.',
    step1Title: 'Profile → Menu',
    step1Body:
      'Open Instagram, go to your profile, tap ☰ (three lines) top-right. Choose "Settings and privacy".',
    step2Title: 'Accounts Center',
    step2Body:
      'At the top of Settings, tap the "Accounts Center" banner. Then tap "Your information and permissions".',
    step3Title: 'Export your information',
    step3Body:
      'Tap "Export your information" → "Create export". Select the Instagram account you want data from.',
    step4Title: 'Followers only + JSON',
    step4Body:
      'Under "Customize information" uncheck everything and check ONLY "Followers and Following". Format: JSON. Tap "Start export".',
    step5Title: 'Email → come back',
    step5Body:
      'In 5–30 minutes you get an email with a download link (valid for 4 days). Download the ZIP to your phone, come back here, tap "Import archive".',
    openInstagram: 'Open Instagram',
    gotIt: 'Got it',
    stepIndicator: 'Step {{current}} of {{total}}',
    next: 'Next',
    prev: 'Back',
    done: 'Done',
  },
  errors: {
    zipInvalid: 'Archive looks corrupt. Try another ZIP file.',
    zipMissingFiles:
      "Archive doesn't contain followers/following files. Did you pick JSON, not HTML?",
    pickFailed: "Couldn't open the file.",
    unknown: 'Something went wrong. Try again.',
  },
};
