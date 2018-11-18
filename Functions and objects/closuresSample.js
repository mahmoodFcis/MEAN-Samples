
  
function doIncrement(){
    var counter=1;
   

    return function(){
        counter++;
        console.log(counter);
        return counter;
        
    };
    // function doIncrement2(){
    //     counter++;
    //     console.log(counter);
    //     return counter;
    // }
   
    // return doIncrement2();

}  

var callX=doIncrement();

callX();
callX();
callX();

