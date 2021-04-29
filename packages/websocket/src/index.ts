
import EventEmitter from "./EventEmitter"

if (!('WebSocket' in window)) {
    console.error("WebSocket no supper")
}

interface IReconnectingWebSocketOption {
    autoOpen?:boolean
}

class ReconnectingWebSocketOption implements ReconnectingWebSocketOption {
    /** 指定协议 */
    protocol:string = ""
    /** 自动打开 */
    autoOpen=true
    /** 重连间隔时间 */
    reconnectInterval=1000
    /** 最大重连间隔时间 */
    maxReconnectInterval=30000
    /** 重新连接延迟的增加速率。允许重新连接尝试在问题持续时退出。 */
    reconnectDecay=1.5
    /** 在关闭并重试之前等待连接成功的最长时间（毫秒）。 */
    timeoutInterval=2000
    /** 尝试重新连接的最大次数。如果为空，则不受限制。 */
    maxReconnectAttempts:null|number=null
    /** 二进制类型，可能值“blob”或“arraybuffer”，默认值为“blob”。 */
    binaryType:"blob"|"arraybuffer"='blob'

    merge(newopt?:IReconnectingWebSocketOption){
        if(!newopt){return this;}
        if(newopt.autoOpen === false){ this.autoOpen = false; } 
        if(newopt.autoOpen === true){ this.autoOpen = true; }
    }
}

export default class ReconnectingWebSocket extends EventEmitter {
    static debugAll = false;

    /** 调试模式 */
    isDebug=false
    /** 连接地址 */
    readonly url:string
    
    protocol:string=""
    // 当前重连次数
    private reconnectAttempts = 0;
    private socket:WebSocket|null = null;
    private option = new ReconnectingWebSocketOption();
    private forcedClose = false;
    // 调试信息
    private log(...args:any[]){
        if (this.isDebug || ReconnectingWebSocket.debugAll) {
            console.log(...args);
        }else{
            this.emit("log",...args)
        }
    }
    // 调试信息
    private debug(...args:any[]){
        if (this.isDebug || ReconnectingWebSocket.debugAll) {
            console.debug(...args);
        }
    }
    close(){
        if(this.socket){
            this.forcedClose = true
            this.socket.close(1000,"正常关闭");
            this.once("close",function() {
                
            })
        }
    }
    send(data:any){
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.debug('ReconnectingWebSocket', 'send', this.url, data);
            this.socket.send(data);
            return Promise.resolve(this.socket)
        } else {
            return this.open()
            .then(socket=>{
                console.debug('ReconnectingWebSocket', 'send', this.url, data);
                this.socket && this.socket.send(data);
            })
        }
    }
    sendnow(data:any){
        if(this.socket && this.socket.readyState === WebSocket.OPEN){
            return this.socket.send(data);
        }else {
            throw '发送失败，socket 未准备好';
        }
    }
    open(){
        return createSocket(this.url)
        .then(socket=>{
            this.socket = socket;
            this.emit("open");
            socket.onmessage = event=>{
                this.emit("message",event)
            }
            socket.onclose = event=>this.onsocketclose()
            socket.onerror = event=>this.onsocketclose();
            return this.socket;
        })
    }

    // 当连接出现异常，调用此方法
    private onsocketclose(){
        if(!this.socket){return}

        // 主动断开
        if(this.forcedClose){
            this.forcedClose = false;
            this.socket.onmessage = null;
            this.socket.onopen = null;
            this.socket.onclose = null;
            this.socket.onerror = null;
            this.socket = null;
            return;
        }

        if(this.socket.readyState === WebSocket.CLOSED){
            if(this.option.maxReconnectAttempts){
                if (this.reconnectAttempts > this.option.maxReconnectAttempts) {
                    this.log("超过最大连接次数")
                    return;
                }
                this.reconnectAttempts++;
            }
            this.open().then(()=>{
                this.emit("reconnent")
            });
        }
    }

    constructor(url:string, options?:object){
        super();
        this.url = url;
        this.option.merge(options)

        if (this.option.autoOpen == true) {
            this.open();
        }
    }
}

function createSocket(url:string,protocol?:string){
    return new Promise<WebSocket>((resolve,reject)=>{
        try{
            let socket = new WebSocket(url, protocol);
            socket.onopen = event=>{
                console.log("onopen");
                resolve(socket);
            }
            socket.onclose = event=>console.log("onclose");
            socket.onmessage = event=>console.log("onmessage");
            socket.onerror = event=>console.log("onerror");
        }catch(ex){
            reject(ex)
        }
    })
}