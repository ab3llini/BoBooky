const { Client } = require('pg');
let query = require('./Query.js');

const client = new Client({
    user: 'kaxtczmqrauqfc',
    host: 'ec2-79-125-2-142.eu-west-1.compute.amazonaws.com',
    database: 'd3k4sooera9fsh',
    password: 'a46181c55c68f90d53b029a88daa5800f4b13f203287f0df528a993ef18e5b14',
    port: 5432,
    ssl : true
});

client.connect();


client.query(query.bookGET(0, 10))
    .then(res => console.log(res.rows))
    .catch(e => console.error(e.stack));