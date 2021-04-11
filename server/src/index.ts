import http,{Server} from "http";
import merge from "./merge-descriptors"



interface handle {
    (...args:any[]):void
}

interface hitem {
    match:string|undefined,
    handle:handle[]
}

class ynserve{
    handles:hitem[]=[]
    serv:Server
    constructor(serv:Server){
        this.serv = serv
    }
    use(a:string|handle|undefined,...handles:handle[]):void{
        if(typeof a === "function"){
            handles = [a].concat(handles)
            a = undefined;
        }
        this.handles.push({
            match:a,
            handle:handles
        })
    }
    listen(...args:any[]){
        this.serv.listen(...args)
    }
}

export default function createServer():Server&ynserve {
    var servers = http.createServer(function root(req:http.IncomingMessage,res: http.ServerResponse){
        let over = false;
        (res as any).send = function(s:string){
            if(over){return;}
            over = true;
            res.end(s)
        }
        for(let i=0;i<app.handles.length;i++){
            for(let m =0;m < app.handles[i].handle.length;m++){
                app.handles[i].handle[m](req,res)
                if(over){break;}
            } 
        }
    })
    var app = new ynserve(servers);
    return app as Server&ynserve;
}