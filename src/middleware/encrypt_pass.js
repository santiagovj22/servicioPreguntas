const bcrypt = require('bcrypt');

module.exports = {
    encryptPassword: password => {
        const salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(password,salt);
        return hash;
    },
    
    matchPassword: async function(password,savePassword) {
        try {
            return await bcrypt.compare(password,savePassword);
        } catch (err) {
            console.log(err)
        }
    }
}


