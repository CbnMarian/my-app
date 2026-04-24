# Unfollow · Design System

> Agent de referință pentru decizii de design.
> Orice UI nou în aplicație trebuie să respecte aceste reguli.
> Ultima actualizare: 2026-04-25

---

## 0. Manifest

**Produsul e un tool, nu o jucărie.** User-ul vine să afle ceva cu miză emoțională (cine nu mă mai urmărește). Design-ul trebuie să:
- Servească informația, nu să o ascundă
- Inspire încredere (privacy, seriousness)
- Fie memorabil fără să fie gălăgios
- Simtă deliberat, nu decorativ

**One aesthetic direction:** Editorial · Nocturnal · Restrained. Think *Financial Times app* × *Linear.app* × *Apple observatorul* — nu Instagram reels, nu Duolingo.

---

## 1. Reguli de aur (în ordine de prioritate)

### R1 — Regula 60-30-10

**60% dominant:** background de bază + surface-uri elevate (neutre)
**30% secondary:** text + border-uri + iconografie (tot neutru)
**10% accent:** UN singur accent color, folosit DOAR pe:
- CTA primar (butonul principal de pe fiecare screen)
- Status activ (tab selected, dot pulsant)
- Emphasis critical (numărul cheie al unei statistici)

**Anti-pattern:** mai mult de 1 accent color pe screen → dilutează focus-ul.

### R2 — Ierarhie prin 3 (nu mai multe)

Orice screen are fix 3 niveluri vizuale:
- **Primary** — elementul principal (hero title, CTA)
- **Secondary** — context/supporting content
- **Tertiary** — metadata, microcopy, timestamps

Dacă simți nevoia de un nivel 4 → regândește screen-ul, nu adăuga style.

### R3 — Space > decor

Albul (sau negrul în dark mode) e un element de design. Prefer spațiu generos față de umplutură decorativă. Dacă un screen pare "gol", e corect — user-ul găsește mai repede ce caută.

### R4 — Tipografia e 80% din experiență

Înainte să adaugi culoare / gradient / shadow, întreabă-te dacă problema se rezolvă prin:
- Weight contrast (Regular vs SemiBold)
- Size contrast (caption vs heading)
- Letter-spacing / tracking
- Italic vs roman

De cele mai multe ori, **typography rezolvă ce credem că rezolvă culoarea**.

### R5 — Motion serves meaning

Animația are scop funcțional:
- **Status change** (loading, success)
- **Hierarchy reveal** (staggered fade-in de sus în jos)
- **Feedback** (press state, haptic)
- **Spatial continuity** (shared element transition între ecrane)

**Anti-pattern:** animație care nu comunică nimic. Dacă o scoți și user-ul nu observă, scoate-o.

### R6 — Thumb zone pentru acțiuni repetate

Pentru acțiuni pe care user-ul le face **de mai multe ori** într-o sesiune → plasează-le în **treimea de jos** a screen-ului (Fitts' law / thumb zone).

Pentru acțiuni **one-shot** (ex: import arhivă), poziționare centrală / hero e OK.

### R7 — Contrast WCAG AA minim

- Body text: **≥ 4.5:1** față de background
- Large text (18px+ bold sau 24px+ regular): ≥ 3:1
- Button label: ≥ 4.5:1

Test în Stark / Figma Contrast / online checker — niciodată ghicit.

### R8 — 8pt grid

Toate spacing-urile sunt multipli de 8 (sau 4 pentru micro-details):
`4, 8, 12, 16, 24, 32, 48, 64, 96`

De ce? Consistency vizuală + compatibility cu Material + iOS point grid.

### R9 — Floating elements peste scroll = backdrop pe element, NU strip

Orice element **poziționat absolut** (sticky, floating, overlay) care stă peste conținut scrollabil **TREBUIE să aibă backdrop propriu** — altfel conținutul se vede prin el.

**Regula:** backdrop-ul e **pe elementul în sine** (pill/chip glass), nu o bară full-width peste el. Bara full-width creează o "zonă de header" visual care ocupă spațiu și conflictă cu layout-ul pe care l-ai ales (ex: kicker+hero pattern).

**Structură obligatorie pentru pill floating:**

```
<Pressable style={trigger}>
  <BlurView intensity={28} tint="dark" style={absolute-fill} />
  <View style={[absolute-fill, { bg: 'rgba(23,23,30,0.55)' }]} />
  <View style={content-row}>... text/icon ...</View>
</Pressable>

+ trigger: { overflow: 'hidden', borderRadius: full, border: hairlineStrong }
```

**De ce `overflow: 'hidden'` e critical:** fără el, BlurView scapă din border-radius și se vede pătrat în spatele pill-ului.

**Contrast minim** pentru pill floating:
- BlurView intensity: 24-32 (suficient pentru estompare, nu exagerat)
- Tint overlay: `rgba(bgHex, 0.50-0.65)` peste blur
- Border: `hairlineStrong` (14% opacity) — delimitare clară
- Text: `textHi` (nu textMid/Lo) — contrast maxim cu conținutul scrollable de sub

**Anti-patterns:**
- ❌ Pill cu `rgba(..., 0.04)` bg transparent → invizibil peste content similar
- ❌ Bara full-width peste tot top-ul → creează a doua zonă UI parazitară
- ❌ BlurView fără `overflow: 'hidden'` pe parent → blur "iese" din pill

---

## 2. Color system

### Palette (dark-first, ce mergem noi)

**60% — Dominant (background)**
```
bg          #0E0E12   (base — slight warmth, nu negru pur)
surface1    #17171E   (cards elevate peste bg)
surface2    #1F1F29   (modals, popovers)
```

**30% — Secondary (neutral text & borders)**
```
textHi      #EDEAF6   (primary text — contrast 15:1 pe bg)
textMid     #B3AFCA   (secondary text — contrast 7:1 pe bg)
textLo      #7A7893   (captions — contrast 4.6:1 pe bg, body-safe)
textDim     #4E4C62   (disabled / decorative — contrast 3:1, NU pentru body)
hairline    rgba(237, 234, 246, 0.08)   (border dividers)
hairlineStrong rgba(237, 234, 246, 0.14) (emphasized dividers)
```

**10% — Accent (ONE color only)**
```
accent      #8B55FF   (purple, slightly desaturated from #7C35FF for dark mode)
accentDeep  #5E29D1   (gradient end / pressed state)
accentSoft  rgba(139, 85, 255, 0.14)   (subtle fill — glass tints)
accentGlow  rgba(139, 85, 255, 0.35)   (shadow glow)
```

**Status colors (use sparingly):**
```
danger      #F26268   (error only — never as accent)
success     accent    (reuse purple for success — don't add green)
```

### Regulile culorii

1. **NU există amber, teal, magenta ca accent.** Acele culori existau în versiunea inițială și au fost eliminate per R1.
2. **Status success = accent (purple).** Nu introduce green — se diluează identitatea.
3. **NU folosi mai mult de 2 gradient-uri pe un screen** (fundal aurora + buton primar max).
4. **Background decorativ (aurora)** — un singur hue (purple), 2 blob-uri de intensități diferite. NU multicolor.

---

## 3. Typography

### Font families

```
Display: Fraunces (variable serif) — headlines, big numbers
UI:      Plus Jakarta Sans — body, buttons, labels, captions
```

De ce mix serif + sans? Contrast cu scop: serif = editorial / premium / atenție; sans = claritate / scan. Nu e decorativ — e ierarhic.

### Type scale (golden ratio 1.618)

Base = 16px body. Scale derivă din aici:

```
displayXL  42px / 46 line-height / -1.2 tracking     Fraunces 700
display    32px / 38 / -0.8                          Fraunces 700
heading    24px / 30 / -0.4                          Jakarta 600
subheading 18px / 24 / -0.2                          Jakarta 500
body       16px / 24 (1.5× lh)                       Jakarta 400
bodyMedium 16px / 24                                 Jakarta 500
caption    13px / 18 (1.4× lh)                       Jakarta 400
kicker     11px / 14 / +2.4 tracking · UPPERCASE     Jakarta 500
numeric    36px / 40 · tabular-nums                  Fraunces 600
```

### Rules

- **Max 2 fonts** pe aplicație (Fraunces + Jakarta). Nu mai adăuga.
- **Line-height = 1.5×** pentru body, **1.2×** pentru display.
- **Tracking negativ pe display** (-0.4 până la -1.2) — feel premium/editorial.
- **Tracking pozitiv generos pe kicker** (+2.4) — small caps să respire.
- **Tabular numbers** pentru statistici (lățime egală per cifră).
- **Italic rar și intenționat** — doar pentru emphasis retoric (ex: *doesn't*), niciodată decorativ.

---

## 4. Spacing (8pt grid)

```
xs   4     micro — gaps interne, border radii mici
sm   8     spacing strâns — icon+text
md   12    spacing comfortable — elemente înrudite
lg   16    spacing comfortable — paragraphs, cards padding
xl   24    section separators, card-to-card
2xl  32    screen padding horizontal
3xl  48    hero padding, între secțiuni majore
4xl  64    padding top de screen (sub status bar)
5xl  96    padding de jos pentru tab bar clearance
```

### Radii

```
sm   8      chips, small buttons
md   12     inputs, badges
lg   20     cards
xl   28     CTA buttons (hero)
2xl  36     rar (modals)
full 9999   avatars, dots
```

---

## 5. Hierarchy patterns

### Pattern: "Editorial page"
Folosit pe Home, History, Settings.

```
[Kicker — UPPERCASE · tracked · textMid]
[Display headline — Fraunces · textHi]
[Optional subhead — body · textMid]
(space)
[Primary content block]
(space)
[Secondary content block]
```

### Pattern: "Data page"
Folosit pe Results.

```
[Compact header: back + kicker]
[Stats row — numeric emphasis]
[Filter/search — horizontal chips]
[Scrolling list — consistent row rhythm]
```

### Pattern: "Settings list"
Folosit pe Settings.

```
[Kicker + heading]
[Group 1 — 2-4 rows]
(gap lg)
[Group 2 — 2-4 rows]
(gap lg)
[Destructive group la final]
```

---

## 6. Components — când să folosești ce

| Need | Component |
|------|-----------|
| Primary action | `GradientButton` (ONE per screen) |
| Secondary action | Text link or subtle pressable (no gradient) |
| Glass card (floating) | `GlassCard` |
| Category label (editorial) | `Kicker` |
| Big headline | Raw Text cu fonts.displayBold |
| User item in list | `UserRow` |
| Stat display | `TickerNumber` + label |
| Trust/privacy signal | `MarqueeBanner` |
| Background atmosphere | `AuroraBackground` (purple-only) |

**ONE gradient per screen.** Dacă ai deja aurora + button, nu adăuga gradient pe avatar / card / etc.

---

## 7. Motion principles

### Timing

```
fast       150ms   — press feedback, hover
base       260ms   — screen transitions, fade
slow       480ms   — complex reveals
breathe    7000ms  — ambient (aurora drift)
```

### Easing

```
standard:  Easing.out(Easing.cubic)        — exit animations, reveals
spring:    { damping: 18, stiffness: 240 } — press, tap
linear:    Easing.linear                    — marquee, infinite loops
breathe:   Easing.inOut(Easing.sin)         — ambient
```

### Rules

1. **Never chain more than 3 animations** pe un screen load. Dacă ai nevoie, folosește stagger delay (100-140ms between).
2. **Press state = always spring** (scale 0.97, never 0.9 — prea agresiv).
3. **Haptic feedback** pe toate tap-urile importante (`Haptics.selectionAsync()` sau `impactAsync('medium')`).
4. **Pe pagini cu date** — counter animation pentru numere mari (TickerNumber).

---

## 8. Anti-patterns — lucruri pe care le-am făcut GREȘIT și le corectăm

**Contextul:** prima iterație a UI-ului (commit inițial `feat: scaffold`) a folosit 4 accent colors simultan. Am refăcut per aceste reguli.

### AP1 — Rainbow avatars
**Greșit:** UserRow avea 4 combinații de gradient rings (purple/magenta, teal/purple, amber/magenta, magenta/purple) rotite pe index.
**Corect:** Avatar cu single border subtle + initial. Focus pe username, nu pe decor.

### AP2 — Amber pe "doesn't" italic
**Greșit:** Cuvântul *doesn't* era în amber (#F5B800), adăuga un al 2-lea accent.
**Corect:** Italicul singur e deja emphasis. Culoarea = aceeași accent (purple) sau neutral textHi.

### AP3 — Teal pe dot-ul marquee
**Greșit:** Pulse dot-ul era teal (#5FE8D3), al 3-lea accent.
**Corect:** Purple (accent-ul unic). Identitate unitară.

### AP4 — Amber pe "not back" ticker
**Greșit:** Numărul de "not following back" era în amber.
**Corect:** Numărul e în accent (purple) — e important și trebuie să iasă, dar în identitatea unitară.

### AP5 — Multicolor aurora background
**Greșit:** Aurora avea 2 blob-uri — unul purple+magenta, altul amber+teal. Prea multă informație în fundal.
**Corect:** Aurora monocromă — 2 blob-uri purple cu intensități și poziții diferite.

### AP6 — Gradient magenta în button
**Greșit:** Button gradient-ul avea tint magenta overlay (rgba(255, 59, 147)).
**Corect:** Gradient pur purple (light purple → deep purple).

### AP7 — Emoji ca iconografie
**Greșit:** `→`, `↗`, `←` ca symbol text.
**Corect:** Lucide icons (ArrowRight, ArrowUpRight, ArrowLeft). Stroke consistent, weight controllable.

### AP8 — Floating TopBar fără backdrop
**Greșit v1:** TopBar-ul cu LanguageSwitcher + HelpButton era poziționat absolut peste ScrollView fără backdrop propriu. La scroll, butonul purple Import se suprapunea peste pill-urile transparente → ilegibil.
**Greșit v2 (over-correction):** Am pus o bară full-width cu BlurView + hairline + fade gradient peste tot top-ul. Rezultat: creasem o "zonă de header" care ocupa vertical spațiu și conflicta cu layout-ul editorial (kicker+hero).
**Corect:** Backdrop-ul e **pe fiecare pill în sine**, nu pe o bară. Pill-ul are `overflow: 'hidden'` + `BlurView` + tint 0.55 în propriul border-radius. Floating natural peste content, fără a crea o zonă de UI separată.

---

## 9. Checklist înainte de a merge un UI

Înainte să comit cod UI nou, verific:

- [ ] **R1** — Am folosit un singur accent color? Niciun magenta/teal/amber?
- [ ] **R2** — Am max 3 niveluri de ierarhie vizuală?
- [ ] **R3** — Am spațiu suficient? Nu e aglomerat?
- [ ] **R4** — Am folosit typography (weight/size) în loc de culoare pentru ierarhie?
- [ ] **R5** — Dacă am animații, fiecare are un scop funcțional?
- [ ] **R6** — Acțiunile repetate sunt în thumb zone?
- [ ] **R7** — Contrast ≥ 4.5:1 pentru body? (test cu Stark)
- [ ] **R8** — Spacing-uri din scala 8pt?
- [ ] **R9** — Elementele floating peste scroll au backdrop (BlurView + tint + fade)?
- [ ] Icon-urile sunt Lucide (nu emoji, nu MaterialIcons mix)?
- [ ] Fonturile sunt doar Fraunces + Jakarta?
- [ ] Am un singur gradient pe screen (max 2 cu aurora)?

Dacă răspund "nu" la oricare → revin și fix înainte de commit.

---

## 10. Referințe

### Reguli (studiate)
- [60-30-10 color rule — Hype4 Academy](https://hype4.academy/articles/design/60-30-10-rule-in-ui)
- [UX Planet — 60-30-10 foolproof guide](https://uxplanet.org/the-60-30-10-rule-a-foolproof-way-to-choose-colors-for-your-ui-design-d15625e56d25)
- [NN/G — Golden Ratio in UI](https://www.nngroup.com/articles/golden-ratio-ui-design/)
- [Figma — Fitts' law resource](https://www.figma.com/resource-library/fitts-law/)
- [Smashing — Thumb Zone](https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/)

### Best practices 2026
- [Mobile app design best practices 2026](https://uiuxdesigning.com/mobile-app-design-best-practices/)
- [Visual hierarchy mobile 2026 guide](https://www.influencers-time.com/visual-hierarchy-and-mobile-conversion-a-2026-design-guide/)
- [Dark mode best practices 2026](https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/)
- [Typography for mobile — Toptal](https://www.toptal.com/designers/typography/typography-for-mobile-apps)

### Inspirație
- **Linear.app** (Orbiter design system) — modular, 8pt grid, minimalist
- **Raycast** — bold accent, minimalist, abstract visual details
- **Arc Browser** — editorial + playful balance
- **Financial Times app** — editorial typography in mobile context
- **Apple Design Resources** — platform conventions

---

## 11. Roadmap de design

### Immediate (post-research)
- [x] Elimin magenta/teal/amber ca accents → purple single
- [x] Rainbow avatars → single subtle border
- [x] Aurora monochromatic
- [x] Italic doesn't → textHi (neutral)
- [x] Marquee dot → purple
- [x] Ticker "not back" → purple

### v0.2
- [ ] Onboarding screen (primul launch)
- [ ] Micro-interactions polish (button press, pull-to-refresh)
- [ ] Empty states per screen
- [ ] Loading skeletons (nu spinners)

### v0.3
- [ ] Paywall screen (Pro)
- [ ] Onboarding tutorial video inline
- [ ] PDF export styling

### v1.0
- [ ] App icon (same palette, editorial mark)
- [ ] Splash screen
- [ ] App Store screenshots (12 max, editorial treatment)

---

## 12. Cum folosești acest doc

1. **Înainte de orice feature UI** → citesc secțiunea 9 (Checklist) și aplic.
2. **Când apare o întrebare de design** → caut în secțiunea 2-8.
3. **Când găsesc un anti-pattern** în cod → îl documentez în secțiunea 8 + scriu reguli derivate în secțiunea 1.
4. **La fiecare review major** → update secțiunile 11 (roadmap) + 8 (anti-patterns).

**Documentul evoluează.** Când o regulă nu mai are sens, o actualizăm — cu commit message clar de ce.
