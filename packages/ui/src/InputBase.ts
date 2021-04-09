import Base,{BaseOption} from "./Base";

interface InputBaseOption extends BaseOption {

}

export default class InputBase extends Base{
    root:HTMLInputElement
    constructor(root:HTMLInputElement,option:InputBaseOption){
        super(root,option);
        this.root = root;
    }

    render(){
        super.render();
    }

    value(value:string){
        if(!arguments.length){
            return this.root.value;
        }else{
            this.root.value = value;
        }
    }
}