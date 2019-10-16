function getCharacterDisplayValue(char: string) {
    if (char === " ") return "Space";

    return char;
}

export default function constructProhibitedCharacterErrorMsg(prohibitedChars: string) {
    if (prohibitedChars.length === 0) return "";

    let prohibitedCharsArray: string[] = [];
    for (let index = 0; index < prohibitedChars.length; index++) {
        const char = getCharacterDisplayValue(prohibitedChars[index]);

        if (prohibitedCharsArray.includes(char)) continue;

        prohibitedCharsArray.push(char);
    }

    if (prohibitedCharsArray.length === 1)
        return `${prohibitedCharsArray[0]} character is not allowed`;
    return `${prohibitedCharsArray.join(" ")} characters are not allowed`;
}
