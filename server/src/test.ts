
interface FooConstructor {
    new(val:number):void
    (val:number):FooConstructor,
    val:number
}


function Too(val:number): FooConstructor;
function Too(this:FooConstructor,val:number){
    if(!(this instanceof Too)){
        return new Too(val)
    }
    
    this.val = val;
}


var Foo:FooConstructor = function(this:FooConstructor|void, val: number) {

    if(!(this instanceof Foo)){
        return new FooConstructor(val)
    }



} as FooConstructor;