console.log("this is the first log");

 var showTimedMsgWithSync=  ()=> {
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



module.exports=showTimedMsgWithSync;
       
