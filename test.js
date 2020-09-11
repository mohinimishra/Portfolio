const bcrypt = require('bcrypt');

let plainPassword = '1234';
let hashPass = bcrypt.hashSync(plainPassword, 10)
console.log(hashPass)

let decPass = bcrypt.compareSync(plainPassword, '1234gfgd')
console.log(decPass)