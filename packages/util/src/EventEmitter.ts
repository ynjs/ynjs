type handler = {
    (...args:any[]):any
    _source?:handler
}

type EventItem = {
    time:number,  // 触发次数 -1: 无限，0:暂停触发，>0:剩余触发次数
    context?:any, // 上下文
    handler:handler // 回调函数
};

export default class EventEmitter{
    _events:Map<string,EventItem[]>=new Map()
    constructor(){
    }

    offAll(){
        this._events.clear()
    }

    //监听event事件，触发时调用callback函数
    on (eventName:string,callback:handler,context?:any,time=-1){ 
        if(!eventName){return this}
        let evnets = this._events.get(eventName);
        if(!evnets){
            evnets = [];
            this._events.set(eventName,evnets)
        }
        evnets.push({
            time:time,
            context:context,
            handler:callback
        })
        return this
    }

    off (eventName:string,callback?:handler){  //停止监听event事件
        if(!eventName){return this}
        if(!callback){
            this._events.delete(eventName);
            return this;
        }
        let events = this._events.get(eventName);
        if(events){
            this._events.set(eventName,events.filter(item=>item.handler===callback))
        }
        return this;
    }

    private getEvents(eventName:string):EventItem[]{
        return this._events.get(eventName)||[];
    }

    // 触发事件，并把参数传给事件的处理函数
    emit (eventName:string,...params:any[]){
        var arr = eventName.split(":");
        arr.forEach((_,i)=>
            this._emitEvent(arr.slice(0,arr.length-i).join(":"),true,...params)
        )
        return this
    }

    // 触发事件，并把参数传给事件的处理函数
    private _emitEvent (eventName:string,removeTime0=true,...params:any[]){
        let events = this.getEvents(eventName);

        let removes = [];
        events.forEach((item,i)=>{
            if(item.time===0){return;} // 触发时生于次数为0，认为是暂停
            if(item.time>0){item.time--;}
            if(item.time===0){removes.push(i);} // 待移除
            item.handler.apply(item.handler||this,params);
        })

        // 移除次数为0的
        if(removeTime0){
            this._events.set(eventName,events.filter(item=>item.time!==0))
        }

        return this
    }

    once (event:string,callback:handler,context?:any){ //为事件注册单次监听器
        this.on(event,callback,context,1);
        return this
    }
}
