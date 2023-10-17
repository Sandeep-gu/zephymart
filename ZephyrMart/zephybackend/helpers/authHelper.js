const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        });
        
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}


const comparePassword = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
}

module.exports = {hashPassword,comparePassword}
