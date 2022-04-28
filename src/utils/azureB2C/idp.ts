import { IdTokenClaims } from "./claims";

export const DEFAULT_IDP = `KidsLoopB2C`;

export const isKidsloopIdp = (idp: IdTokenClaims["idp"]) => idp.toLowerCase().startsWith(`kidsloop`);
