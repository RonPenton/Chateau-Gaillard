import _ from 'lodash';

export function leftEquals(first: string, second: string): boolean {
    first = first.trim();
    let seconds = second.trim().split(' ');
    const secondmin = (_.minBy(seconds, x => x.length) ?? "").length;
    const minlen = Math.min(first.length, secondmin);

    if(minlen == 0) {
        throw new Error("Something went really wrong here");
    }

    first = first.substr(0, minlen).toLowerCase();
    seconds = seconds.map(x => x.substr(0, minlen).toLowerCase());

    if (seconds.some(x => x == first))
        return true;

    return false;
}
