

const MySqlDB = require('./MySqlDB');

const db1= new MySqlDB("db1");

db1.createTable("users",[
    {name:"userName",dataType:"string",isRequired:true},
    {name:"marks",dataType:"int",isRequired:false},
]);


db1.insertRecord("users",{userName:"ABC",marks:20});
db1.insertRecord("users",{userName:"DEF",marks:90});
db1.insertRecord("users",{userName:"GHI",marks:20});
db1.insertRecord("users",{userName:"JKL",marks:60});


db1.selectAll("users");
db1.selectByFilter("users",{name:"marks",value:20});


db1.dropTable("users");


db1.createTable("users",[
    {name:"userName",dataType:"string",isRequired:true},
    {name:"marks",dataType:"int",isRequired:false},
]);

db1.selectAll("users");
db1.selectByFilter("users",{name:"marks",value:20});


