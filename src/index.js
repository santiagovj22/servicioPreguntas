const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(cors());
app.use(require('./routes/index'));


app.get('/', (req,res) => {
    res.send('Api questions and answers')
})
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
