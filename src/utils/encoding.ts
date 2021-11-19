import { Buffer } from "buffer";

export const base64Encode = (input: string) => Buffer.from(input).toString(`base64`);

export const base64Decode = (input: string) => Buffer.from(input, `base64`).toString(`utf-8`);
