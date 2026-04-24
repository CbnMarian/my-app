import {
  useFonts as useFraunces,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  Fraunces_600SemiBold_Italic,
} from '@expo-google-fonts/fraunces';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';

export function useAppFonts(): boolean {
  const [loaded] = useFraunces({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Fraunces_600SemiBold_Italic,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  return loaded;
}
