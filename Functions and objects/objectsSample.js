var Person = function (weight, color, gender, age, name, meters) {
    this.Weight = weight;

    this.Age = age;


    this.Walk = function () {

        return meters;
    }

}

//implementing inheritance
var mahmoudPerson=new Person(20,'red','M',20,"Mahmoud",4000);


var PersonX=function()
{
    this.Name2="Ahmed";
    this.Age2=20;
}

PersonX.prototype=Person;
PersonX.constructor=Person;
var instanceX=new PersonX();
instanceX.Age=80;
console.log(instanceX.Age);


//Object Literals 

var Animal={
    weight:20,
    Name:"Horse"
};

console.log(Animal.Name);

var dog=Animal;
dog.Name="Dog";

dog.Age=50;

console.log(dog.Age);

