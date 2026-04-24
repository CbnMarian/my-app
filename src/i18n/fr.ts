import type { TranslationKeys } from './ro';

export const fr: TranslationKeys = {
  common: {
    appName: 'Unfollow',
    tagline: 'Découvre qui ne te suit pas en retour',
    back: 'Retour',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    close: 'Fermer',
    save: 'Enregistrer',
    delete: 'Supprimer',
    share: 'Partager',
    export: 'Exporter',
    loading: 'Chargement...',
    processing: 'Traitement...',
    error: 'Erreur',
    retry: 'Réessayer',
  },
  home: {
    heroTitleLine1: 'Vois qui',
    heroTitleLine1Italic: 'ne',
    heroTitleLine2: 'te suit pas en retour.',
    heroSubtitle: "Import sécurisé, sans mot de passe, 100% sur ton appareil.",
    importButton: "Importer l'archive",
    howItWorks: 'Trois étapes simples',
    stepOneTitle: 'Télécharge tes données',
    stepOneBody:
      "Instagram → Paramètres → Centre de comptes → Télécharger tes informations (format JSON).",
    stepTwoTitle: "Attends l'email",
    stepTwoBody:
      "Instagram t'envoie un ZIP par email, généralement en moins de 30 minutes.",
    stepThreeTitle: "Importe dans l'app",
    stepThreeBody: 'Touche le bouton ci-dessus et choisis le ZIP. Analyse instantanée.',
  },
  results: {
    notFollowingBack: 'Ne te suivent pas',
    youDontFollowBack: 'Tu ne suis pas',
    mutual: 'Mutuel',
    empty: 'Aucun résultat',
    searchPlaceholder: "Chercher un nom d'utilisateur...",
    followingCount: 'abonnements',
    followersCount: 'abonnés',
  },
  history: {
    title: 'Historique',
    empty: 'Aucune capture enregistrée',
    emptyHint: 'Importe une archive pour enregistrer ta première capture.',
    createdAt: 'Créé le',
    deleteConfirm: 'Supprimer cette capture ?',
  },
  settings: {
    title: 'Paramètres',
    language: 'Langue',
    theme: 'Thème',
    upgradePro: 'Passer à Pro',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    about: 'À propos',
    version: 'Version',
    clearData: 'Effacer toutes les données',
  },
  languages: {
    label: 'Langue',
    en: 'English',
    ro: 'Română',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
  },
  help: {
    title: 'Aide',
    subtitle: 'Comment exporter tes données Instagram',
    intro:
      "Instagram te permet d'exporter uniquement ta liste d'abonnés en JSON, sans tout télécharger. 5 étapes, 5 à 30 minutes.",
    step1Title: 'Profil → Menu',
    step1Body:
      "Ouvre Instagram, va sur ton profil et touche ☰ (trois lignes) en haut à droite. Choisis « Paramètres et confidentialité ».",
    step2Title: 'Centre de comptes',
    step2Body:
      "En haut des paramètres, touche la bannière « Centre de comptes ». Puis « Tes informations et autorisations ».",
    step3Title: 'Exporter tes informations',
    step3Body:
      'Touche « Exporter tes informations » → « Créer un export ». Sélectionne le compte Instagram voulu.',
    step4Title: "Abonnés uniquement + JSON",
    step4Body:
      "Dans « Personnaliser les informations », décoche tout et coche UNIQUEMENT « Abonnés et Abonnements ». Format : JSON. Touche « Lancer l'export ».",
    step5Title: 'Email → reviens',
    step5Body:
      "En 5 à 30 minutes tu reçois un email avec un lien de téléchargement (valide 4 jours). Télécharge le ZIP, reviens ici et touche « Importer l'archive ».",
    openInstagram: 'Ouvrir Instagram',
    gotIt: 'Compris',
    stepIndicator: 'Étape {{current}} sur {{total}}',
    next: 'Suivant',
    prev: 'Retour',
    done: 'Terminé',
  },
  errors: {
    zipInvalid: "L'archive semble corrompue. Essaie un autre ZIP.",
    zipMissingFiles:
      "L'archive ne contient pas les fichiers followers/following. Tu as choisi JSON, pas HTML ?",
    pickFailed: "Impossible d'ouvrir le fichier.",
    unknown: "Quelque chose s'est mal passé. Réessaie.",
  },
};
