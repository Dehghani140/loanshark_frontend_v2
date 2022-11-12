export function roundDown(number:number, decimals:number) {
    decimals = decimals || 0;
    return Number(Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}
