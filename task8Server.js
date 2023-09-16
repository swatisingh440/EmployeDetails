let express=require('express');
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
});
let mysql=require('mysql');
let connData={
    host:'localhost',
    user:'root',
    password:'',
    database:'training',
};

const port=2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
app.get("/srv/emp",function(req,res){
    let department=req.query.department;
    let designation=req.query.designation;
    let gender=req.query.gender;
    let connection=mysql.createConnection(connData);
    let sql= "select * from taskTable ";
        connection.query(sql,function(err,result){
            if(err) res.status(404).send(err.message);
            else {
                let arr=[...result]
                
                if(department){
                 arr=arr.filter((pr)=>pr.department===department)
                 console.log(arr)
            }
            if(designation){
                arr=arr.filter((pr)=>pr.designation===designation)
               
            }
            if(gender){
                arr=arr.filter((pr)=>pr.gender===gender)
                
            }
                res.send(arr)
                }
        })
    

})
app.get("/srv/emp/:dept",function(req,res){
    let dept=req.params.dept;
    let connection=mysql.createConnection(connData);
    let sql="SELECT * FROM taskTable WHERE department=?";
    
    connection.query(sql,dept,function(err,result){
        if(err) res.status(404).send(err.message);
        else {
            console.log(result)
            res.send(result)
            }
    })
})
app.get("/srv/emp/des/:desig",function(req,res){
    let desig=req.params.desig;
    let connection=mysql.createConnection(connData);
    let sql="SELECT * FROM taskTable WHERE designation=?";
    
    connection.query(sql,desig,function(err,result){
        if(err) res.status(404).send(err.message);
        else {
            console.log(result)
            res.send(result)
            }
    })
})
app.get("/srv/emp/id/:empCode",function(req,res){
    let empCode=req.params.empCode;
    let connection=mysql.createConnection(connData);
    let sql="SELECT * FROM taskTable WHERE empCode=?";
    
    connection.query(sql,empCode,function(err,result){
        if(err) res.status(404).send(err.message);
        else {
            console.log(result)
            res.send(result)
            }
    })
})
app.post("/srv/emp",function(req,res){
    let body=req.body;
    console.log(body)
    const arr1=[body.empCode,body.name,body.department,body.designation,body.salary,body.gender]
    let connection=mysql.createConnection(connData);
    let sql="insert into taskTable(empCode,name,department,designation,salary,gender) values(?,?,?,?,?,?)";
    console.log(sql,arr1)
    connection.query(sql,arr1,function(err,result){
        if(err) res.status(404).send(err.message)
        else {
            console.log(result)
            res.send(arr1)}
    })
})
app.delete("/srv/emp/:empCode",function(req,res){
    let empCode=req.params.empCode;
    let connection=mysql.createConnection(connData);

    let sql="delete from taskTable where empCode=?";
    connection.query(sql,empCode,function(err,result){
        if(err) res.status(404).send(err.message)
        else {
            console.log(result)
            res.send(result)}
    })
})
app.put("/srv/emp/:empCode",function(req,res){
    let empCode=req.params.empCode;
    let body=req.body;
    const arr1=[body.empCode,body.name,body.department,body.designation,body.salary,body.gender]
    let connection=mysql.createConnection(connData);
    let sql='delete from taskTable where empCode=?';
    console.log(sql,arr1)
    connection.query(sql,empCode,function(err,result){
        if(err) res.status(404).send(err.message)
        else {
            console.log(result)
            let sql2='insert into taskTable (empCode,name,department,designation,salary,gender) values(?,?,?,?,?,?)';
            connection.query(sql2,arr1,function(err,result){
                if(err) res.send(err.message)
                else {
                    console.log(result,arr1)
                    res.send(result);}
    
            })
            }
    })

})
