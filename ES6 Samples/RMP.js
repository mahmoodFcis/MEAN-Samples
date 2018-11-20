/// Revealing module pattern
//IIFE
var obj=(function(){

    var x=1,z=2;

    var myfunction=function(){
        return x+z;
    }

    return{
        publicFunction:myfunction
    }

}());

obj.publicFunction();