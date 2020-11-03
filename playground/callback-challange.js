const doWorkCallBack = (callback) => {
    setTimeout(() => {
        // callback('This is my error', undefined)
        callback(undefined,[1,4,7])
    }, 2000);
}

doWorkCallBack((error, reslut) => {
    if (error) {
        return console.log(error);
    }
    console.log(reslut);
})



// const add = (num1,num2,callback) => {
//     setTimeout( () => {
//         const add = num1 + num2
//         callback(add)
//     },1000)

// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })