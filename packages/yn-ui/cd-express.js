module.exports = {
    port:3000,
    debug:false,
    static:{
        "~":["./"],
    },
    open:{
        enabled:true,
        app: 'chrome',
        url:"/example/"
    }
}