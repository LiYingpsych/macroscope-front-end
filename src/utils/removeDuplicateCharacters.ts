export function removeDuplicateCharacters(str: string) {
    return str
        .split("")
        .filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        })
        .join("");
}
