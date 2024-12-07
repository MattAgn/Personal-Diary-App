import { createTamagui } from "tamagui";

import { theme } from "@/theme";

export const tamaguiConfig = createTamagui(theme);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
