import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ChevronRight,
  Download,
  Menu,
  Users,
  Image as ImageIcon,
  MessageCircle,
  Heart,
  ShieldCheck,
} from 'lucide-react-native';

import { PhoneMockup } from './PhoneMockup';
import { HighlightRing } from '../HighlightRing';
import { palette, radii } from '@/src/theme/tokens';

/** Muted palette for the mockup — NOT our app accent */
const ig = {
  bg: '#0a0a0a',
  surface: '#1a1a1a',
  surfaceHi: '#222228',
  border: 'rgba(255, 255, 255, 0.08)',
  textHi: '#F0F0F3',
  textMid: '#9A9AA0',
  textLo: '#5A5A60',
  iconBg: 'rgba(255, 255, 255, 0.08)',
};

/* ============================================================
 * STEP 1 — Instagram profile screen, highlight hamburger menu ☰
 * ============================================================ */
export function MockupStep1() {
  return (
    <PhoneMockup>
      <View style={styles.igHeader}>
        <Text style={styles.igTitle}>your.handle</Text>
        <View style={styles.headerActions}>
          <View style={styles.iconGhost}>
            <Heart size={13} color={ig.textHi} strokeWidth={1.8} />
          </View>
          <View style={styles.iconGhost}>
            <MessageCircle size={13} color={ig.textHi} strokeWidth={1.8} />
          </View>
          <HighlightRing radius={radii.sm} style={styles.iconTarget}>
            <View style={styles.menuIcon}>
              <Menu size={16} color={ig.textHi} strokeWidth={1.8} />
            </View>
          </HighlightRing>
        </View>
      </View>
      <View style={styles.profileRow}>
        <View style={styles.avatar} />
        <View style={styles.stat}>
          <Text style={styles.statNum}>128</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>1.2k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>842</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <View style={styles.bioBlock}>
        <View style={[styles.bioLine, { width: '60%' }]} />
        <View style={[styles.bioLine, { width: '85%' }]} />
        <View style={[styles.bioLine, { width: '40%' }]} />
      </View>
      <View style={styles.profileButtons}>
        <View style={styles.profileBtn}>
          <Text style={styles.profileBtnText}>Edit profile</Text>
        </View>
        <View style={styles.profileBtn}>
          <Text style={styles.profileBtnText}>Share profile</Text>
        </View>
      </View>
      <View style={styles.grid}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={styles.gridCell} />
        ))}
      </View>
    </PhoneMockup>
  );
}

/* ============================================================
 * STEP 2 — Settings: Accounts Center banner at TOP highlighted
 * ============================================================ */
export function MockupStep2() {
  return (
    <PhoneMockup>
      <View style={styles.navHeader}>
        <Text style={styles.navTitle}>Settings and activity</Text>
      </View>
      <View style={styles.settingsBody}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search</Text>
        </View>

        <HighlightRing style={{ borderRadius: 12, marginTop: 10 }} radius={12}>
          <View style={styles.accountsCenterBanner}>
            <View style={styles.acLogo}>
              <View style={[styles.acDot, { backgroundColor: '#FD1D1D' }]} />
              <View style={[styles.acDot, { backgroundColor: '#833AB4', left: 6 }]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.acTitle}>Accounts Center</Text>
              <Text style={styles.acSub}>
                Password, security, personal details, ad preferences
              </Text>
            </View>
            <ChevronRight size={13} color={ig.textMid} strokeWidth={2} />
          </View>
        </HighlightRing>

        <Text style={styles.sectionLabel}>Your account</Text>
        <View style={styles.list}>
          <SettingsItem label="Saved" />
          <SettingsItem label="Archive" />
          <SettingsItem label="Your activity" />
        </View>
        <Text style={styles.sectionLabel}>How you use Instagram</Text>
        <View style={styles.list}>
          <SettingsItem label="Notifications" />
        </View>
      </View>
    </PhoneMockup>
  );
}

/* ============================================================
 * STEP 3 — Accounts Center → Export your information highlighted
 * ============================================================ */
export function MockupStep3() {
  return (
    <PhoneMockup>
      <View style={styles.navHeader}>
        <Text style={styles.navTitle}>Accounts Center</Text>
      </View>
      <View style={styles.settingsBody}>
        <Text style={styles.sectionLabel}>Account settings</Text>
        <View style={styles.list}>
          <SettingsItem label="Personal details" />
          <SettingsItem label="Password and security" />
        </View>
        <Text style={styles.sectionLabel}>Your information and permissions</Text>
        <View style={styles.list}>
          <SettingsItem label="Access your information" />
          <HighlightRing style={{ borderRadius: radii.sm, marginTop: 2 }} radius={radii.sm}>
            <View style={[styles.settingsItem, { borderTopColor: 'transparent' }]}>
              <Download size={13} color={ig.textHi} strokeWidth={2} />
              <Text style={[styles.settingsItemText, { color: ig.textHi }]}>
                Export your information
              </Text>
              <ChevronRight size={13} color={ig.textMid} strokeWidth={2} />
            </View>
          </HighlightRing>
          <SettingsItem label="Transfer a copy of your information" />
        </View>
      </View>
    </PhoneMockup>
  );
}

/* ============================================================
 * STEP 4 — Customize information: Followers+Following checked, JSON
 * ============================================================ */
export function MockupStep4() {
  return (
    <PhoneMockup>
      <View style={styles.navHeader}>
        <Text style={styles.navTitleSm}>Customize information</Text>
      </View>
      <View style={styles.settingsBody}>
        <Text style={styles.helperText}>Select only what you need to export.</Text>

        <View style={styles.list}>
          <CheckboxRow icon={<Users size={12} color={ig.textHi} strokeWidth={2} />} label="Followers and Following" checked highlighted />
          <CheckboxRow icon={<ImageIcon size={12} color={ig.textMid} strokeWidth={2} />} label="Posts" />
          <CheckboxRow icon={<MessageCircle size={12} color={ig.textMid} strokeWidth={2} />} label="Messages" />
          <CheckboxRow icon={<Heart size={12} color={ig.textMid} strokeWidth={2} />} label="Likes" />
          <CheckboxRow icon={<ShieldCheck size={12} color={ig.textMid} strokeWidth={2} />} label="Your information" />
        </View>

        <View style={styles.formatSection}>
          <Text style={styles.sectionLabelTight}>FORMAT</Text>
          <HighlightRing style={{ borderRadius: 10 }} radius={10}>
            <View style={styles.formatRow}>
              <View style={[styles.formatOption, styles.formatActive]}>
                <Text style={styles.formatActiveText}>JSON</Text>
              </View>
              <View style={styles.formatOption}>
                <Text style={styles.formatInactiveText}>HTML</Text>
              </View>
            </View>
          </HighlightRing>
        </View>

        <View style={styles.startBtn}>
          <Text style={styles.startBtnText}>Start export</Text>
        </View>
      </View>
    </PhoneMockup>
  );
}

/* ============================================================
 * STEP 5 — Email arrived + our app highlighted Import archive
 * ============================================================ */
export function MockupStep5() {
  return (
    <PhoneMockup>
      <View style={styles.navHeader}>
        <Text style={styles.navTitle}>Inbox</Text>
      </View>
      <View style={styles.emailList}>
        <View style={styles.emailCard}>
          <View style={styles.emailRow}>
            <View style={styles.emailAvatar}>
              <Text style={styles.emailAvatarText}>M</Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.emailFrom}>Meta · Instagram</Text>
              <Text style={styles.emailSubject} numberOfLines={1}>
                Your information is ready
              </Text>
              <Text style={styles.emailSnippet} numberOfLines={2}>
                Click the link below to download your archive. Link is valid for 4 days.
              </Text>
            </View>
          </View>
          <HighlightRing style={{ borderRadius: 8, marginTop: 10 }} radius={8}>
            <View style={styles.emailBtn}>
              <Download size={11} color={ig.textHi} strokeWidth={2} />
              <Text style={styles.emailBtnText}>Download archive.zip</Text>
            </View>
          </HighlightRing>
        </View>
        <View style={styles.emailGhost} />
        <View style={styles.emailGhost} />
      </View>
    </PhoneMockup>
  );
}

/* ============================================================
 * Helpers
 * ============================================================ */
function SettingsItem({ label }: { label: string }) {
  return (
    <View style={styles.settingsItem}>
      <Text style={styles.settingsItemText}>{label}</Text>
      <ChevronRight size={13} color={ig.textLo} strokeWidth={2} />
    </View>
  );
}

function CheckboxRow({
  icon,
  label,
  checked,
  highlighted,
}: {
  icon: React.ReactNode;
  label: string;
  checked?: boolean;
  highlighted?: boolean;
}) {
  const Row = (
    <View style={styles.cbRow}>
      <View style={styles.cbIcon}>{icon}</View>
      <Text style={[styles.cbLabel, checked && { color: ig.textHi }]}>{label}</Text>
      <View
        style={[
          styles.cbBox,
          checked && { backgroundColor: palette.accent, borderColor: palette.accent },
        ]}
      >
        {checked ? (
          <View style={styles.cbCheck}>
            <Text style={styles.cbCheckMark}>✓</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
  return highlighted ? (
    <HighlightRing radius={radii.sm} style={{ borderRadius: radii.sm }}>
      {Row}
    </HighlightRing>
  ) : (
    Row
  );
}

export function getMockupForStep(step: number): React.ReactElement {
  switch (step) {
    case 1:
      return <MockupStep1 />;
    case 2:
      return <MockupStep2 />;
    case 3:
      return <MockupStep3 />;
    case 4:
      return <MockupStep4 />;
    case 5:
      return <MockupStep5 />;
    default:
      return <MockupStep1 />;
  }
}

const styles = StyleSheet.create({
  /* Shared */
  navHeader: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ig.border,
  },
  navTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: ig.textHi,
    fontSize: 15,
  },
  navTitleSm: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 13,
  },
  settingsBody: { paddingHorizontal: 12, paddingTop: 8 },
  sectionLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textLo,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 14,
    marginBottom: 6,
  },
  sectionLabelTight: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textLo,
    fontSize: 8,
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  list: { backgroundColor: ig.surface, borderRadius: 10, paddingHorizontal: 10 },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: ig.border,
  },
  settingsItemText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: ig.textMid,
    fontSize: 11,
    flex: 1,
  },
  helperText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    color: ig.textLo,
    fontSize: 10,
    marginTop: 4,
    marginBottom: 10,
    lineHeight: 14,
  },

  /* Step 1 — Profile */
  igHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ig.border,
  },
  igTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 13,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconGhost: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTarget: { padding: 2 },
  menuIcon: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radii.full,
    backgroundColor: '#333',
    borderWidth: 1.5,
    borderColor: '#FD1D1D',
  },
  stat: { alignItems: 'center', flex: 1 },
  statNum: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 12,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_400Regular',
    color: ig.textMid,
    fontSize: 8,
    marginTop: 1,
  },
  bioBlock: { paddingHorizontal: 12, gap: 3, paddingBottom: 8 },
  bioLine: {
    height: 4,
    borderRadius: 2,
    backgroundColor: ig.surface,
  },
  profileButtons: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  profileBtn: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: ig.surface,
    alignItems: 'center',
  },
  profileBtnText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 9,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
  },
  gridCell: {
    width: '33.1%',
    aspectRatio: 1,
    backgroundColor: ig.surface,
  },

  /* Step 2 — Settings */
  searchBar: {
    height: 26,
    borderRadius: 8,
    backgroundColor: ig.surface,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginTop: 4,
  },
  searchText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: ig.textLo,
    fontSize: 10,
  },
  accountsCenterBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
    backgroundColor: ig.surface,
    borderRadius: 10,
  },
  acLogo: {
    width: 22,
    height: 18,
    position: 'relative',
    marginRight: 2,
  },
  acDot: {
    position: 'absolute',
    top: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.9,
  },
  acTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 11,
  },
  acSub: {
    fontFamily: 'PlusJakartaSans_400Regular',
    color: ig.textLo,
    fontSize: 8,
    marginTop: 1,
  },

  /* Step 4 — Customize */
  cbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    gap: 8,
  },
  cbIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: ig.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cbLabel: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: ig.textMid,
    fontSize: 11,
  },
  cbBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: ig.textLo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cbCheck: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cbCheckMark: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 10,
  },
  formatSection: { marginTop: 14 },
  formatRow: { flexDirection: 'row', gap: 6, padding: 3, borderRadius: 10, backgroundColor: ig.surface },
  formatOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },
  formatActive: {
    backgroundColor: ig.surfaceHi,
  },
  formatActiveText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: ig.textHi,
    fontSize: 10,
  },
  formatInactiveText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: ig.textLo,
    fontSize: 10,
  },
  startBtn: {
    marginTop: 14,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#3B82F6',
  },
  startBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#fff',
    fontSize: 11,
  },

  /* Step 5 — Email */
  emailList: { padding: 12, gap: 8 },
  emailCard: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: ig.surface,
  },
  emailRow: { flexDirection: 'row', gap: 8 },
  emailAvatar: {
    width: 26,
    height: 26,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#833AB4',
  },
  emailAvatarText: {
    fontFamily: 'Fraunces_700Bold',
    color: '#fff',
    fontSize: 10,
  },
  emailFrom: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 9,
  },
  emailSubject: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: ig.textMid,
    fontSize: 9,
  },
  emailSnippet: {
    fontFamily: 'PlusJakartaSans_400Regular',
    color: ig.textLo,
    fontSize: 8,
    lineHeight: 11,
    marginTop: 1,
  },
  emailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(139, 85, 255, 0.2)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.accent,
  },
  emailBtnText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: ig.textHi,
    fontSize: 9,
  },
  emailGhost: {
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
});
