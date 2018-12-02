console.log("this is the first log");

var showTimedMsg = function () {
        return new Promise((resolve, reject) => {

                try {
                    setTimeout(function () {
                        resolve(30);
                    }, 3000);

                } catch (err) {
                    reject(err);
                }
            
        });
    }


       showTimedMsg().then(res=>{
            console.log(res);
        }).catch(err=>{console.log("an error occurred"+err)});



module.exports=showTimedMsg;
       
