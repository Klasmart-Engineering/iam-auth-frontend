export const omitNullish = (obj: Record<string, string | undefined | null>): Record<string, string> => {
    return Object.fromEntries(Object.entries(obj).filter((entry): entry is [string, string] => typeof entry[1] === `string`));
};
