
const MySqlTable = require('./MysqlTable')

class MySqlDB
{
    name;
    tableMap;

    constructor(name){
        this.tableMap= new Map();
        this.name=name;
    }

    createTable(tableName,columnList){
        
        try
        {
            if(this.tableMap.has(tableName)){
                throw new Error(`Table ${tableName} already exists in db: ${this.name}`)
            }
    
            const table=new MySqlTable(tableName,columnList);
            table.create();
    
            this.tableMap.set(tableName,table);    
        }
        catch(error){
            console.error(`Error:`,error.message);
            throw error;
        }     
    }

    dropTable(tableName){
        
        try
        {
            if(!this.tableMap.has(tableName)){
                throw new Error(`No such table ${tableName} exists in db: ${this.name}`)
            }
    
            const table = this.tableMap.get(tableName);
            table.delete();
    
            this.tableMap.delete(tableName);
        }
        catch(error){
            console.error(`Error:`,error.message);
        }
        
    }

    insertRecord(tableName,row){

        try
        {
            if(!this.tableMap.has(tableName)){
                throw new Error(`No such table ${tableName} exists in db: ${this.name}`)
            }
    
            const table = this.tableMap.get(tableName);
            table.insert(row);
        }
        catch(error){
            console.error(`Error:`,error.message);
        }
    }

    selectAll(tableName){
        
        try
        {
            if(!this.tableMap.has(tableName)){
                throw new Error(`No such table ${tableName} exists in db: ${this.name}`)
            }
    
            const table = this.tableMap.get(tableName);
            const rows= table.select(null);
            console.log(`Select ALL from ${tableName}:`,rows);
        }
        catch(error){
            console.error(`Error:`,error.message);
        }
    }

    selectByFilter(tableName,filterObj){
        
        try
        {
            if(!this.tableMap.has(tableName)){
                throw new Error(`No such table ${tableName} exists in db: ${this.name}`)
            }
    
            const table = this.tableMap.get(tableName);
            const rows= table.select(filterObj);

            console.log(`Select Filter ${JSON.stringify(filterObj)} from ${tableName}:`,rows);
        }
        catch(error){
            console.error(`Error:`,error.message);
        }
    }
}


module.exports = MySqlDB;
