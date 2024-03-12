const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { mongooseConnection } = require('../config/mongoose.config');

class Server {

    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;

        //database connection
        this.dbConnection();
        //middlewares
        this.middlewares();
        //application routes
        this.routes();

    }

    async dbConnection(){
        await mongooseConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

    }

    routes(){
       this.app.use('/api', require('../routes/index'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Listening port",this.port);
        });
    }

}

module.exports = Server;
