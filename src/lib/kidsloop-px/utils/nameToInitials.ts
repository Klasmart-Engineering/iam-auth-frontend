export default (name: string, maxLength = Number.MAX_SAFE_INTEGER): string => {
    if (!name) return ``;
    const match = name
        .replace(/[^\p{L}\d ]/ug, ``)
        .match(/\p{Lu}\p{Ll}+|\d|\p{Lu}{3,}|\p{Ll}+|\p{Lu}/ug);
    if (!match) return name.substring(0, Math.min(maxLength, 1)).toUpperCase();
    return match.map((m => m.substring(0, 1))).join(``).toUpperCase().substring(0, maxLength);
};
