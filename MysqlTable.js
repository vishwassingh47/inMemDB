
/*
{
    name:string,
    dataType:string,
    isRequired:boolean
}
*/

class MySqlTable
{
    name;
    columnList;
    rows;

    constructor(name,columnList){
        this.name=name;
        this.columnList=columnList;
        this.rows=null;
    }

    create(){
        if(this.columnList.length==0){
            throw new Error(`Cannot create table without columns`);
        }
        this.rows=[];
        console.log(`[${this.constructor.name}] : Created Table ${this.name} `);
    }

    delete(){
        this.rows=null;
        console.log(`[${this.constructor.name}] : Deleted Table ${this.name} `);
    }

    validate(row){
        for(const column of this.columnList){

            if(column.isRequired && row[column.name]===undefined){
                throw new Error(`Missing required field ${column.name}`);
            }

            if(row[column.name]!=undefined){

                switch(column.dataType){
                    case "int":
                        
                        if(typeof row[column.name] != "number" || row[column.name]>1024 || row[column.name]<(-1024) || row[column.name]!== parseInt(row[column.name]))
                        {
                            throw new Error(`${row[column.name]} is not a valid ${column.dataType}`)
                        }

                        break;

                    case "string":
                        if(typeof row[column.name] != "string" || row[column.name].length>20)
                        {
                            throw new Error(`${row[column.name]} is not a valid ${column.dataType}`)
                        }

                        break;
                }
            }

        }
    }

    insert(row){
        this.validate(row);
        this.rows.push(row);

        console.log(`[${this.constructor.name}] : ${JSON.stringify(row)} inserted to table ${this.name}`);
    }

    select(filterColumn){

        const result = [];
        for(const row of this.rows){

            if(!filterColumn || row[filterColumn.name]==filterColumn.value){
                result.push(row);
            }
        }

        return result;
    }
}

module.exports = MySqlTable;
