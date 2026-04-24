# Unfollow App — Arhitectură

> Aplicație iOS + Android care procesează local arhiva Instagram (export GDPR) și arată cine nu te urmărește înapoi.
> Zero login Instagram, zero scraping, zero server. Totul pe device.

## Stack

- **Framework:** React Native 0.81 + Expo SDK 54
- **Routing:** Expo Router 6 (file-based, ca Next.js)
- **Language:** TypeScript strict
- **State:** Zustand
- **Styling:** StyleSheet + design tokens (`src/theme/tokens.ts`)
- **i18n:** i18n-js + expo-localization (RO, EN la launch)
- **ZIP parsing:** JSZip
- **File picker:** expo-document-picker
- **File I/O:** expo-file-system (new `File` API)
- **Persistence:** @react-native-async-storage/async-storage

## Structură foldere

```
unfollow-app/
├── app/                      # Expo Router screens (file-based routing)
│   ├── _layout.tsx           # Root stack: (tabs) + results
│   ├── results.tsx           # Stack screen — rezultate după import
│   └── (tabs)/
│       ├── _layout.tsx       # Tab bar: Home, History, Settings
│       ├── index.tsx         # Home / Import
│       ├── history.tsx       # Snapshots istorice
│       └── settings.tsx      # Setări, Pro, about
│
├── src/
│   ├── components/           # UI shared components
│   │   ├── PrimaryButton.tsx
│   │   ├── StepCard.tsx
│   │   ├── SettingsRow.tsx
│   │   ├── ListTabs.tsx
│   │   └── UserRow.tsx
│   │
│   ├── services/             # Business logic (pur, fără UI)
│   │   ├── instagramParser.ts    # Parse ZIP → ComparisonResult
│   │   ├── snapshotManager.ts    # Save/load/diff snapshots
│   │   └── storage.ts            # AsyncStorage wrapper tipizat
│   │
│   ├── stores/               # Zustand stores
│   │   └── useDataStore.ts       # Result curent + search + selected list
│   │
│   ├── types/                # Tipuri TS
│   │   └── instagram.ts          # Tipuri pentru ZIP Instagram + domain
│   │
│   ├── i18n/                 # Translations
│   │   ├── index.ts              # Setup i18n-js + locale detection
│   │   ├── ro.ts                 # Source of truth (RO)
│   │   └── en.ts                 # EN folosind tipul din ro.ts
│   │
│   ├── theme/                # Design tokens
│   │   └── tokens.ts             # Palette, spacing, radii, typography
│   │
│   └── utils/                # Generic helpers (gol acum)
│
├── components/               # Componente template Expo (themed-text etc.)
├── constants/                # Expo template (theme.ts legacy)
├── hooks/                    # Expo template (color scheme)
├── assets/                   # Imagini, icons, splash
├── app.json                  # Config Expo
├── tsconfig.json             # Alias @/* → root
└── package.json
```

## Flux de date

```
1. User tap "Import arhivă" (app/(tabs)/index.tsx)
   ↓
2. DocumentPicker.getDocumentAsync() → URI ZIP
   ↓
3. new File(uri).arrayBuffer() → ArrayBuffer
   ↓
4. parseInstagramZip(buffer) → ComparisonResult
   (JSZip extrage followers_*.json + following.json)
   ↓
5. saveSnapshot(result) → AsyncStorage (local, on-device)
   ↓
6. useDataStore.setResult(result)
   ↓
7. router.push('/results')
   ↓
8. ResultsScreen citește din store → FlatList cu 3 tab-uri
```

## Principii cheie

### 1. Zero backend
Toată logica rulează on-device. Nu există server, nu există upload de date. Simplifică privacy policy și elimină costuri de hosting.

### 2. Services pure, fără imports React
`src/services/*` nu importă React sau React Native. Sunt funcții pure, testabile la viteză maximă. UI-ul consumă rezultatele lor prin stores sau direct.

### 3. Tokens > valori hardcoded
Toate culorile, spacing, radii vin din `src/theme/tokens.ts`. Nu scrie `#7C35FF` direct — folosește `palette.purple500`.

### 4. i18n din ziua 1
Tot textul user-facing trece prin `t('key.path')`. Sursa e RO (piața noastră principală), EN derivă tipurile.

### 5. Types first
Tipurile pentru structura ZIP Instagram trăiesc în `src/types/instagram.ts`. Orice parser sau store folosește tipurile astea. Dacă schimbă Instagram formatul, updatezi într-un singur loc.

## Convenții

- **Imports absolute:** `@/...` pentru root, `@/src/...` pentru logic
- **File names:** `PascalCase.tsx` pentru componente, `camelCase.ts` pentru logic
- **Export:** named exports pentru componente și funcții, default export doar pentru screen-uri Expo Router
- **Styling:** `StyleSheet.create` la baza fișierului; tokens în tot fișierul
- **Color scheme:** citit cu `useColorScheme()` din hook-ul Expo, apoi `theme[scheme]`

## Roadmap (ce urmează)

### v0.1 — MVP (ce avem acum)
- [x] Import ZIP → parsing → afișare 3 liste
- [x] Salvare snapshot local
- [x] History tab cu lista snapshot-uri
- [ ] Search real-time în rezultate (implementat partial)
- [ ] Open profile deep link (funcționează)

### v0.2 — Polish
- [ ] Animații la tranzitia între tab-uri
- [ ] Onboarding primul launch (ghid 3 pași)
- [ ] Export CSV prin share sheet
- [ ] Detectare limbă device + toggle RO/EN

### v0.3 — Pro features (monetizare)
- [ ] RevenueCat setup
- [ ] Paywall la feature Pro
- [ ] Multi-account support
- [ ] PDF export raport (viral share)
- [ ] Ghost followers (dacă integrăm engagement data — necesită date adiționale din ZIP)

### v1.0 — Launch
- [ ] App icons + splash screen
- [ ] App Store listing + screenshots (RO + EN)
- [ ] Privacy Policy + Terms
- [ ] Submit App Store + Play Store

## Legal & compliance

- **No credentials** — never asked, never stored
- **On-device processing** — nimic nu iese de pe telefon
- **Apple Guideline 5.2.2** — respectat (no third-party credentials)
- **GDPR** — user-ul procesează propriile date exportate de el
- **Instagram ToS** — zero scraping, zero unauthorized API calls
- **Disclaimer** — "Not affiliated with Instagram/Meta" în listing

## Comenzi utile

```bash
# Start dev server
npm run start

# Run pe iOS simulator
npm run ios

# Run pe Android emulator
npm run android

# Typecheck
npx tsc --noEmit

# Lint
npm run lint
```
