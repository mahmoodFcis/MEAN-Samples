function doSomething(){
console.log("hello");

// returns satatic string
return "not hello";
}

var outVal=doSomething();
console.log(outVal);
// declaring using expressions
var doSomethingElse=function(name,age,birthDate){
    name=name||"Mahmoud";
  if(name==="")
  {
    console.log('====================================');
    console.log("hello world");
    console.log('====================================');
  }
}

