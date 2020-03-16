const Helper =  {
    isValidEmail(email){
        return /^([a-z].[a-z0-9]+).\@.([a-z0-9]{2,}).\.([a-z]{2,3}\.[a-z]{2,3}|[a-z]{2,3})/.test(email);
    }
}

module.exports = Helper;