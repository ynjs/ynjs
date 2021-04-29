type handler = (...args: any[])=>any

class EventItem {
    handler:handler
    time:number // 剩余次数 0 不触发
    autoRemove: boolean // 剩余次数为0时自动移除
    context?:any
    constructor(handler:handler,context?:any,time:number = -1,autoRemove=true){
        this.handler = handler
        this.time = time;
        this.context = context;
        this.autoRemove = autoRemove;
    }
}

export default class EventEmitter {
    // 所有订阅事件
    private _events:Map<string,EventItem[]> = new Map()

    constructor (){
    }

    private get(name:string){
        return this._events.get(name);
    }
    private set(name:string,items:EventItem[]){
        return this._events.set(name,items);
    }
    private add(name:string,handler:handler,context:any=null,time:number=-1){
        let items = this.get(name);
        let currentItem = new EventItem(handler,context,time);
        if(items){
            items.push(currentItem)
        }else{
            this.set(name,[currentItem])
        }
        return this;
    }
    off(name:string,handler:handler){
        let items = this.get(name);
        if(items && items.length){
            if(handler){
                this.set(name,items.filter(item=>item.handler==handler))
            }else{
                this.set(name,[])
            }
        }
        return this;
    }
    on (name:string,callback:handler,context?:any){  //监听event事件，触发时调用callback函数
        return this.add(name,callback,context)
    }
    once (name:string,callback:handler,context?:any){  //监听event事件，触发时调用callback函数
        return this.add(name,callback,context,1)
    }
    emit (eventName:string,...params:any[]){ //触发事件，并把参数传给事件的处理函数
        var arr = eventName.split(":");
        for(var i=arr.length;i>0;i--){
            const items = this.get(arr.slice(0,i).join(":"))||[]
            items.forEach(item=>{
                item.handler.apply(item.context||this,params)
                if(item.time>1){item.time--;}
            })
            this.set(eventName,items.filter(item=>item.time === 0 && item.autoRemove))
        }
        return this
    }
    destory(){
        this._events.clear();
    }
}