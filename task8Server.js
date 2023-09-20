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
const {Client}=require("pg");
const client=new Client({
    user:"postgres",
    password:"Codingisnothing@123",
    database:"postgres",
    port:5432,
    host:"db.hjpthlfsvksrkkeycgvh.supabase.co",
    ssl:{rejectUnauthorized:false},
});
client.connect(function(res,error){
    console.log('Connected!||');
});
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
app.get("/emp",function(req,res,next){
    let department=req.query.department;
    let designation=req.query.designation;
    let gender=req.query.gender;
    console.log("Inside /users get api");
    
    const query=`SELECT * FROM employee`;
    client.query(query,function(err,result){
        if(err){res.status(400).send(err);
        }
        console.log(result)
        let arr=[...result.rows]
        if(department){
            arr=arr.filter((pr)=>pr.department===department)
        }
        if(designation){
            arr=arr.filter((pr)=>pr.designation===designation)
        }
        if(gender){
            arr=arr.filter((pr)=>pr.gender===gender)
        }
        res.send(arr);
    //client.end();
        
    })
});
function resetData(){
    let {data}=require('./task8Data.js');
        console.log(data)
        let arr=data.map(p=>[p.empCode,p.name,p.department,p.designation,p.salary,p.gender]);
        console.log(arr)
        let values=[arr]
        let query=`INSERT INTO employee (empCode,name,department,designation,salary,gender) VALUES($1,$2,$3,$4,$5,$6)`;
        client.query(query,arr[12],function(err,result){
            if(err){console.log(err.message)}
            console.log('complete')}
        )
};
//resetData()
app.get("/emp/:dept",function(req,res,next){
    let department=req.params.dept;
    let values=[department]
    const query=`SELECT * FROM employee WHERE department=$1`;
    client.query(query,values,function(err,result){
        console.log("inside get")
        if(err){res.status(400).send(err);}
        console.log(result)
        res.send(result.rows)
       })
})
app.get("/emp/desig/:desig",function(req,res,next){
    let designation=req.params.desig;
    let value=[designation]
    const query=`SELECT * FROM employee WHERE designation=$1`;
    client.query(query,value,function(err,result){
        if(err){res.status(400).send(err);}
        res.send(result.rows)
        })
})
app.get("/emp/empCode/:empCode",function(req,res,next){
    let empCode=req.params.empCode;
    let value=[empCode]
    const query=`SELECT * FROM employee WHERE empCode=$1`;
    client.query(query,value,function(err,result){
        if(err){res.status(400).send(err);}
        res.send(result.rows)
        })
})
app.post("/emp",function(req,res,next){
    console.log("Inside post of emp");
    var values=Object.values(req.body);
    console.log(values);
    const query=`INSERT INTO employee (empCode,name,department,designation,salary,gender) VALUES($1,$2,$3,$4,$5,$6)`;
    client.query(query,values,function(err,result){
        if(err){res.send(400).send(err);}
        res.send(`${result.rowCount}insertion succesful`);
    });
});
app.put("/emp/:empCode",function(req,res,next){
    console.log("Inside put of user");
    let userCode=req.params.empCode;
    let name=req.body.name;
    let department=req.body.department;
    let designation=req.body.designation;
    let salary=req.body.salary;
    let gender=req.body.gender;
    let value=[userCode]
    console.log(userCode)
    let query1=`DELETE FROM employee WHERE empcode=$1`;
    client.query(query1,value,function(err,result){
        if(err){res.send(400).send(err);}
            console.log('after delete')
            let values=[userCode,name,department,designation,salary,gender]
            const query=`INSERT INTO employee (empCode,name,department,designation,salary,gender) VALUES($1,$2,$3,$4,$5,$6)`;
            client.query(query,values,function(err,result){
                if(err){res.send(400).send(err);}
                res.send(`${result.rowCount} updation succesful`);
            });
        
    });
   

});
app.delete("/emp/:empCode",function(req,res,next){
    let empCode=req.params.empCode;
    let values=[empCode]
    let query=`DELETE FROM employee WHERE empCode=$1`;
    console.log(values)
    client.query(query,values,function(err,result){
        if(err){res.send(400).send(err);}
        res.send(`${result.rowCount} updation succesful`);
    });
})


