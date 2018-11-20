var incrementCounter=function()
{
    var counter=1;
    
   

    return function()
    {
        counter++;
        console.log(counter);
        return counter;
    }
   
}

var callBack=incrementCounter();  //2    //
callBack();  //3
callBack(); //4
callBack(); //5


(function(){


    
}());
function person()
{
  this.walk=function(){

  }

 
}


import * as helper from './module1';
helper.displayConcatenting();
displayConcatenting();