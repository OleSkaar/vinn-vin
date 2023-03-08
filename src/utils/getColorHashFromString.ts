// Thanks to Aslam on StackOverflow: https://stackoverflow.com/a/66494926
export const getColorHashFromString = (stringInput: string) => {
    const stringUniqueHash = [...stringInput].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
};