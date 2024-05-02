import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

const createMagic = (key) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      extensions: [new OAuthExtension()]
    })
  );
};

export const magic = createMagic("pk_live_3CE84BD39270E181");