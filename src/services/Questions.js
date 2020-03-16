const { }

class Question{

        async getQuestions(){
            try{
               const query = 'select questionid, userid, content , status from questions where status = 1 and userid=$1'   
               const result = this.connect(query, [question])  
            } catch(err){
                console.log(err)
            }
        }

}
module.exports = new Question()