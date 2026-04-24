import type { TranslationKeys } from './ro';

export const es: TranslationKeys = {
  common: {
    appName: 'Unfollow',
    tagline: 'Descubre quién no te sigue de vuelta',
    back: 'Atrás',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    close: 'Cerrar',
    save: 'Guardar',
    delete: 'Eliminar',
    share: 'Compartir',
    export: 'Exportar',
    loading: 'Cargando...',
    processing: 'Procesando...',
    error: 'Error',
    retry: 'Reintentar',
  },
  home: {
    heroTitleLine1: 'Descubre quién',
    heroTitleLine1Italic: 'no',
    heroTitleLine2: 'te sigue de vuelta.',
    heroSubtitle: 'Importación segura, sin contraseña, 100% en tu dispositivo.',
    importButton: 'Importar archivo',
    howItWorks: 'Tres pasos sencillos',
    stepOneTitle: 'Descarga tus datos',
    stepOneBody:
      'Instagram → Ajustes → Centro de cuentas → Descargar tu información (formato JSON).',
    stepTwoTitle: 'Espera el correo',
    stepTwoBody:
      'Instagram te envía un ZIP por email, normalmente en menos de 30 minutos.',
    stepThreeTitle: 'Importa en la app',
    stepThreeBody: 'Pulsa el botón de arriba y elige el ZIP. Análisis instantáneo.',
  },
  results: {
    notFollowingBack: 'No te siguen',
    youDontFollowBack: 'No sigues',
    mutual: 'Mutuo',
    empty: 'Sin resultados',
    searchPlaceholder: 'Buscar usuario...',
    followingCount: 'siguiendo',
    followersCount: 'seguidores',
  },
  history: {
    title: 'Historial',
    empty: 'Aún no hay capturas guardadas',
    emptyHint: 'Importa un archivo para guardar tu primera captura.',
    createdAt: 'Creado el',
    deleteConfirm: '¿Eliminar esta captura?',
  },
  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    theme: 'Tema',
    upgradePro: 'Pasar a Pro',
    privacy: 'Privacidad',
    terms: 'Términos',
    about: 'Acerca de',
    version: 'Versión',
    clearData: 'Borrar todos los datos',
  },
  languages: {
    label: 'Idioma',
    en: 'English',
    ro: 'Română',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
  },
  help: {
    title: 'Ayuda',
    subtitle: 'Cómo exportar tus datos de Instagram',
    intro:
      'Instagram te permite exportar solo tu lista de seguidores en JSON, sin descargar todo. 5 pasos, tarda entre 5 y 30 minutos.',
    step1Title: 'Perfil → Menú',
    step1Body:
      'Abre Instagram, entra en tu perfil y pulsa ☰ (tres líneas) arriba a la derecha. Elige "Configuración y privacidad".',
    step2Title: 'Centro de cuentas',
    step2Body:
      'En la parte superior de Ajustes, pulsa el banner "Centro de cuentas". Luego "Tu información y permisos".',
    step3Title: 'Exportar tu información',
    step3Body:
      'Pulsa "Exportar tu información" → "Crear exportación". Selecciona la cuenta de Instagram que quieres.',
    step4Title: 'Solo seguidores + JSON',
    step4Body:
      'En "Personalizar información", desmarca todo y marca SOLO "Seguidores y Siguiendo". Formato: JSON. Pulsa "Iniciar exportación".',
    step5Title: 'Email → vuelve aquí',
    step5Body:
      'En 5–30 minutos recibes un email con el enlace de descarga (válido 4 días). Descarga el ZIP al móvil, vuelve aquí y pulsa "Importar archivo".',
    openInstagram: 'Abrir Instagram',
    gotIt: 'Entendido',
    stepIndicator: 'Paso {{current}} de {{total}}',
    next: 'Siguiente',
    prev: 'Atrás',
    done: 'Listo',
  },
  errors: {
    zipInvalid: 'El archivo parece dañado. Prueba con otro ZIP.',
    zipMissingFiles:
      'El archivo no contiene followers/following. ¿Descargaste JSON, no HTML?',
    pickFailed: 'No se pudo abrir el archivo.',
    unknown: 'Algo salió mal. Inténtalo de nuevo.',
  },
};
