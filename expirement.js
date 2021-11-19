const fs = require('fs/promises')



//const array = [1,2,3,4,5]  // <- Array is also object


fs.readFile(`${__dirname}/hi1.txt`).then((smth) => {
  let arr = JSON.parse(smth.toString())
  arr = [...arr, arr.length]
  fs.writeFile(`${__dirname}/hi1.txt`, JSON.stringify(arr)).then(()=>{
    console.log('done')
  })
})



//console.log(__dirname)    this is to know

//fs.readFile(`${__dirname}/hi1.txt`).then((smth) => {
 //   let arr = JSON.parse(smth.toString())
  //  arr = [...arr, arr.length]
  //  fs.writeFile(`${__dirname}/hi1.txt`, JSON.stringify(arr)).then(() => {
  //    console.log('done')
  //  })
  //})
 // GET − Provides read-only access to a resource.
//PUT − Creates a new resource.
//DELETE − Removes a resource.
//POST − Updates an existing resource or creates a new resource.





// csv  = comma separeted values
// tsv  =  tab separeted values
// terminal commands
// pwd
// ls . - list of the file
// cd  nameOfTheFolderOrNavigate