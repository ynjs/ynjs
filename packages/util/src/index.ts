const cid = Date.now();
let index = 0;
export function genid(){
    return cid+(index++).toString();
}