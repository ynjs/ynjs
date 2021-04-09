import EventEmitter from "../../util/src/EventEmitter"
export interface BaseOption {
    id?:string
    readonly:boolean
}

const CID = Date.now();
let INDEX = 0;

class DefaultBaseOption implements BaseOption {
    readonly = false
    disabled = false
}

export default class Base extends EventEmitter{

    readonly name = "Base"

    private option:DefaultBaseOption
    
    // 已渲染
    private rendered = false

    root:HTMLElement

    constructor(root:HTMLElement,option:BaseOption){
        super();
        this.option = new DefaultBaseOption();
        this.setOption(option,false);
        this.root = root;
    }

    render(){
        this.rendered = true;
        this.disable(this.option.disabled)
    }

    destroy(){
        console.log("销毁");
    }

    disable(disabled=true,emit=true){
        if(disabled){
            this.root.classList.add("disabled")
        }else{
            this.root.classList.remove("disabled")
        }
    }

    setOption(option:BaseOption,emit=true){
        this.option = Object.assign(this.option,option)
        if(emit){ this.emit("optionChange") }
    }

    static genid(s="",e=""){
        return s+CID+(INDEX++).toString()+e;
    }
}