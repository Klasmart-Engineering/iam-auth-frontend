// Avoid Typescript's "signature of 'atob'/'btoa' is deprecated" message, which is only relevant for Node
// https://github.com/microsoft/TypeScript/issues/45566
// This saves using `buffer` npm package
export const base64Encode = window.btoa;

export const base64Decode = window.atob;
