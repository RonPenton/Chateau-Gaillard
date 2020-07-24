export function _in<T>(item: T, ...rest: T[]) {
    if (rest.some(x => x == item))
        return true;
    return false;
}
