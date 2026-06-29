var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database:"SERENO-living"
});





// con.connect(function(err){

//   if(err) throw  err;
//   console.log("Connected!");
//   con.query("CREATED DATABASE flowerport",function (err , result){
//     if(err) throw err;
//     console.log("Database created")
//   });
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 
//   con.query("CREATE DATABASE flowerport", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });


  // var sql = "CREATE TABLE flowerport (name VARCHAR(255), address VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });

  // var sql = "INSERT INTO  flowerport (name, address) VALUES ('Company Inc', 'Highway 37')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });

  // var sql = "insert into flowerport (name, address) values ?";
  // var values = [
  //   ['John', 'Highway 71'],
  //   ['Peter', 'Lowstreet 4'],
  //   ['Amy', 'Apple st 652'],
  //   ['Hannah', 'Mountain 21'],
  //   ['Michael', 'Valley 345'],
  //   ['Sandy', 'Ocean blvd 2'],
  //   ['Betty', 'Green Grass 1'],
  //   ['Richard', 'Sky st 331'],
  //   ['Susan', 'One way 98'],
  //   ['Vicky', 'Yellow Garden 2'],
  //   ['Ben', 'Park Lane 38'],
  //   ['William', 'Central st 954'],
  //   ['Chuck', 'Main Road 989'],
  //   ['Viola', 'Sideway 1633']
  // ];
  // con.query(sql,[values],function(err,result){
  //   if(err) throw err;
  //   console.log("Number of records inserted :" + result.affectedRows);
   
  //   });

    // con.query("select * from flowerport",function(err,result,fields){
    //   if(err) throw err;
    //    console.log(result);
      
    
    // });

   

 
  // con.query("DELETE FROM flowerport WHERE name = 'Richard'",(err,result)=>{
  //   if(err) throw err;
  //   console.log("Number of records deleted:" + result.affectedRows);
  // });



// con.query("select * from flowerport  order by  name",function(err,result){
//   if(err) throw err;
//   console.log(result)
// }); bv 

// con.query("alter table flowerport  add column contact int(12)",(err,result)=>{
//   if(err) throw err;
//   console.log("result")
// });


con.query("update flowerport set contact=234567891 where name='william'",(err,result)=>{
  if (err)throw err ;
  console.log('number of column updated:'+result.affectedRows );
});

 
});









  








