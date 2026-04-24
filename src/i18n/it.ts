import type { TranslationKeys } from './ro';

export const it: TranslationKeys = {
  common: {
    appName: 'Unfollow',
    tagline: 'Scopri chi non ti segue più',
    back: 'Indietro',
    cancel: 'Annulla',
    confirm: 'Conferma',
    close: 'Chiudi',
    save: 'Salva',
    delete: 'Elimina',
    share: 'Condividi',
    export: 'Esporta',
    loading: 'Caricamento...',
    processing: 'Elaborazione...',
    error: 'Errore',
    retry: 'Riprova',
  },
  home: {
    heroTitleLine1: 'Scopri chi',
    heroTitleLine1Italic: 'non',
    heroTitleLine2: 'ti segue più.',
    heroSubtitle: 'Importazione sicura, senza password, 100% sul tuo dispositivo.',
    importButton: 'Importa archivio',
    howItWorks: 'Tre semplici passaggi',
    stepOneTitle: 'Scarica i tuoi dati',
    stepOneBody:
      'Instagram → Impostazioni → Centro gestione account → Scarica le tue informazioni (formato JSON).',
    stepTwoTitle: "Attendi l'email",
    stepTwoBody:
      "Instagram ti invia un archivio ZIP via email, di solito entro 30 minuti.",
    stepThreeTitle: "Importa nell'app",
    stepThreeBody: 'Tocca il pulsante qui sopra e scegli il file ZIP. Analisi istantanea.',
  },
  results: {
    notFollowingBack: 'Non ti seguono',
    youDontFollowBack: 'Non segui',
    mutual: 'Reciproco',
    empty: 'Nessun risultato',
    searchPlaceholder: 'Cerca username...',
    followingCount: 'seguiti',
    followersCount: 'follower',
  },
  history: {
    title: 'Cronologia',
    empty: 'Ancora nessun snapshot salvato',
    emptyHint: 'Importa un archivio per salvare il tuo primo snapshot.',
    createdAt: 'Creato il',
    deleteConfirm: 'Eliminare questo snapshot?',
  },
  settings: {
    title: 'Impostazioni',
    language: 'Lingua',
    theme: 'Tema',
    upgradePro: 'Passa a Pro',
    privacy: 'Privacy',
    terms: 'Termini',
    about: 'Informazioni',
    version: 'Versione',
    clearData: 'Cancella tutti i dati',
  },
  languages: {
    label: 'Lingua',
    en: 'English',
    ro: 'Română',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
  },
  help: {
    title: 'Aiuto',
    subtitle: 'Come esportare i tuoi dati Instagram',
    intro:
      'Instagram ti permette di esportare solo la lista dei follower in JSON, senza scaricare tutto. 5 passaggi, 5–30 minuti.',
    step1Title: 'Profilo → Menu',
    step1Body:
      "Apri Instagram, vai sul tuo profilo e tocca ☰ (tre linee) in alto a destra. Scegli «Impostazioni e privacy».",
    step2Title: 'Centro gestione account',
    step2Body:
      "In alto nelle Impostazioni, tocca il banner «Centro gestione account». Poi «Le tue informazioni e autorizzazioni».",
    step3Title: 'Esporta le tue informazioni',
    step3Body:
      'Tocca «Esporta le tue informazioni» → «Crea esportazione». Seleziona l\'account Instagram.',
    step4Title: 'Solo follower + JSON',
    step4Body:
      "In «Personalizza informazioni», deseleziona tutto e seleziona SOLO «Follower e Seguiti». Formato: JSON. Tocca «Avvia esportazione».",
    step5Title: 'Email → torna qui',
    step5Body:
      "In 5–30 minuti ricevi un'email con il link di download (valido 4 giorni). Scarica lo ZIP, torna qui e tocca «Importa archivio».",
    openInstagram: 'Apri Instagram',
    gotIt: 'Capito',
    stepIndicator: 'Passaggio {{current}} di {{total}}',
    next: 'Avanti',
    prev: 'Indietro',
    done: 'Fatto',
  },
  errors: {
    zipInvalid: "L'archivio sembra danneggiato. Prova un altro file ZIP.",
    zipMissingFiles:
      "L'archivio non contiene i file followers/following. Hai scaricato JSON, non HTML?",
    pickFailed: 'Impossibile aprire il file.',
    unknown: 'Qualcosa è andato storto. Riprova.',
  },
};
