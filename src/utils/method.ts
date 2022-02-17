export const randomValue = (len:any)=> {
    function dechex(str:any) {
        return "" === str ? "" : str.toString(16)
    }
    for (var str = "", i = 0; i < len; i++)
        str += dechex(Math.floor(16 * Math.random()));
    return str
}