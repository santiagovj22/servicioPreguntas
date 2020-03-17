const { Client, connectionData} = require('../lib/database');
const { ROLE_ASESOR, STATUS} = require('../utils/constants');
const { encryptPassword, matchPassword} = require('../middleware/encrypt_pass');
const { secret_key } = require('../config/environments');
const jwt = require('jsonwebtoken');
const {isValidEmail} = require('../controllers/helpers');


class Users {

    constructor(){
        this.connectionString = `postgres://${connectionData.user}:${connectionData.password}@${connectionData.host}:${connectionData.port}/${connectionData.database}`
    }

    async connect(query, values) {
        return new Promise((resolve, reject) => {
          try {
            const client = new Client(this.connectionString);
            client.connect();
            client.query(query, values && values.length > 0 && values, function(err, result) {
              client.end();
              if (err) return reject(err);
              resolve(result);
            });
          } catch (err) {

            reject(err);
          }
        });
      }
     
      async registerAdmin (email,password) {
        try{
          if(!email  || !password){
            return {message: "Enter your email and password"}
          }
          if(!isValidEmail(email)){
              return {message:'Please enter a valid email address'}
          }
            const queryBuscar = 'select * from users where email = $1'
            let resultBuscar = await this.connect(queryBuscar, [email])
            if (resultBuscar.rows.length > 0){
              return { message: 'Email already exists'}
            } else {
                const hash = await encryptPassword(password)
                const query = 'insert into users(roleid, email, password,status) values($1, $2, $3, $4)'
                let result = await this.connect(query, [ROLE_ASESOR,email, hash, 1])
                return {message:'User has been register', data:result.rows}
            }  
          } catch(err){
              console.log(err);
          }
      }

      async loginAdmin (email,password){
        try{
          if(!email  || !password){
            return {message: "Enter your email and password"}
          }
          if(!isValidEmail(email)){
            return {message:'Please enter a valid email address'}
        }
          let userDB 
          const query = 'select roleid,email,password from users where email = $1'
          let result = await this.connect(query, [email])
    
          if(result.rows.length > 0){
            userDB = result.rows[0];
            const match = await matchPassword(password, userDB.password);
            if(match){
              const token  =  await jwt.sign({userid:userDB.userid, email:userDB.email}, secret_key)
              //sessionStorage.setItem('user_token', token);
              return {respuesta: 'Your token',token,error: false}
            } else {
              return {respuesta: 'Incorrect password', error: true}
            }
          } else {
            return {respuesta: 'User not exists in the database',error: true}
          }     
        } catch(err){
          console.log(err)
        }
      }

      async getOpenQuestions (){
        try{
          const query = 'select questionid, userid, content, status from questions where status = 1'
          const result = await this.connect(query);
          return result.rows
        }catch(err){
          console.log(err);
        }
      }

      async deleteQuestions (questionid){
        try{
          if(questionid){
            const query = 'update questions set status = 0 where status=1 and questionid = $1'
            await this.connect(query, [questionid]);
            return {message:"Question has been delete... (change state to cancel)"}
          } else{
            return {message: "Error to delete the question"};
          }
        } catch(err){
          console.log(err)
        }
      }

      async createQuestion(userid,content) {
        try{
          if(!content){
            return {message: "The question should have content"}
          }
          const query = 'insert into questions(userid, content , status ) values($1, $2, $3)'
          await this.connect(query, [userid,content,STATUS.OPEN]);
          return {message: 'Question has been created'}
        } catch(err){
        console.log(err)
        }
      }
}

module.exports = new Users();