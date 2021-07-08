export enum IdentityType {
    PHONE,
    EMAIL,
}

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export function getIdentityType (id: string) {
    if (id.indexOf(`@`) !== -1) { return IdentityType.EMAIL; }
    if (phoneRegex.test(id)) { return IdentityType.PHONE; }
}
