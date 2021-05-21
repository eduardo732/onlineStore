import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//const envFound = dotenv.config();

//if(envFound.error) throw new Error("Couldn't find .env file");

export default {
    port: parseInt(process.env.PORT || '4000', 10),

    db: {
        host: process.env.DB_HOST || 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
        user: process.env.DB_USER || 'bsale_test',
        pass: process.env.DB_PASS || 'bsale_test',
        name: process.env.DB_NAME ||  'bsale_test' 
    },

    api: {
        prefix: '/api'
    }
}