const bcrypt = require("bcryptjs");

const password = "senha123";

const hash = bcrypt.hashSync(password, 10);

console.log("HASH GERADO:");
console.log(hash);
