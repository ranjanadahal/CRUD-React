// var c = getServerData(1, function(obj){

//  //  display
//     console.log('ma mathi bata',obj);
// })

// //other
// console.log('ma tala bata',c)//use garnai bhhayena

// // document.getElementById("#nep").onclick(function(event){


// // });

// function getServerData(a, b) {

//     setTimeout(() => {
//         //
//         b({a:2})
//     }, 2000);
// }


var getData = new Promise(function (resolve, reject) {
    setTimeout(() => {
        if (false) {
            resolve({ msg: 'success aayo' });
        } else {
            reject({ msg: 'error aayo' });

        }
    }, 2000);

})

var c = getData
    .then(function (a) { console.log('from then', a) })
    .catch(function (a) { console.log('from catch', a) });

    // var c=await getData();

console.log('tala bata', c);