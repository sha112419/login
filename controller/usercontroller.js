const db = require("../models/index");
const multer = require("multer");
const upload = multer();

const User = db.user;


const addUser = async(req,res) =>{
    try{
     let info ={
        firstname: req.body.firstname,
        lastnamae: req.body.lastname,
        fathername: req.body.fathername,
        nationality: req.body.nationality,
        gender: req.body.gender,
        placeofissue: req.body.placeofissue,
        Profile: req.body.Profile,
        serialno: req.body.serialno,
        password: req.body.password
     };
     if(info){
        const user =await User.create(info).then(result =>{
            return res.status(200).json({
                success: true,
                message: "user created successfully",
                result: result,
            })
        }).catch(err =>{
            console.log("something wrong2",err)
        })
     } else{
        return res.send(201).json({
            success:false,
            message:"something wrong 1"
        })
     }   
    }
    catch(error){
        return res.status(201).json({
            success: false,
            message: "something wrong"
        })
    }
};

const getallUser = async (req,res) =>{
    try {
      const user =await User.findall({});
      res.status(200).send(user);
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: "something wrong3"
        })
    }
}

const getoneUser = async(req, res) =>{
    let id = req.body.id;
    const user= await User.findOne({
        attributes:[
            'id',
            'firstname',
            'lastname',
            'fathername',
            'nationality',
            'gender',
            'placeofissue'
        ],
        where:{id: id}})
    res.status(201).send(user); 
  };

const updateUser = async (req,res) =>{
    const {
        id,
        firstname,
        lastname,
        fathername,
        nationality,
        gender,
        placeofissue,
        Profile,
        serialno,
        password
    }= req.body
    try{
    await User.findOne({
        where:{id:id},
    })
    .then(async function(result){
        if(result){
            await User.update({
            firstname: firstname,
            lastnamae: lastname,
            fathername: fathername,
            nationality: nationality,
            gender: gender,
            placeofissue: placeofissue,
            Profile: Profile,
            serialno: serialno,
            password: password
            },{
                where:{id:id},
            })
        }
        return res.status(200).json({
            success:true,
            message: "user updated successfully"
        })
    }).catch((err)=>{
        return res.status(201).json({
            success:false,
            message:"something wrong5"
        })
    })
    }catch(err){
        return res.status(201).json({
            success: false,
            message: "something wrong4"
          })
    }
};

const deleteUser = async (req, res) => {
    let Id = req.body.id;
  
    var index ;
    for(let values in User){
        if(User[values] === Id){
          index = User[values];
          break;
        }
    }

    if (index) {
      res.status(404).json({ 
        status: 0,
        message: "id not found" });
    } else {
      await User.destroy({ where: { id: Id } });
      res.status(202).json({
        status: 1,
        message: "deleted successfully",
      });
    }
  };

  const uploadimage = async(req,res) =>{
    const id = req.body.id;
    Profile = req.body.filename;
    try{
      // console.log("fdfdfh",err)
      if(Profile !=null){
        await User.findAll({
          where:{
            id:id
          }
        })
        .then(async function(req,res){
         await User.update({
          Profile: Profile,
        },
        {
          where:{id:id},
        }
        )
        }).catch((err)=>{
          return res.status(201).json({
            success: false,
            message:"something wrong 8"
          });
        })
        return res.status(200).json({
          success: true,
          message:"profile uploded successfully"
        })
      } else{
        return res.status(201).json({
          success: false,
          message: "something wrong7"
        })
      }
    } catch(error){
      return res.status(201).json({
        success: false,
        message: "something wrong6"
      })
    }
  };

const loginUser = async(req,res) =>{
    const {Serialno, password} =req.body
    try {
        await User.findOne({
            where:{
                Serialno:Serialno
            },
        })
        .then(async function(result){
            if (result.serialno == Serialno && result.password == password) {
                return res.status(200).json({
                    success: true,
                    message: "user login successfully",
                    result: result,
                })
            } else {
                return res.send(201).json({
                    success:false,
                    message:"invalid user details"
                })
            }
        }).catch((err)=>{
            return res.status(201).json({
                success: false,
                message: "something wrong10"
              })
        })
    } catch (error) {
        return res.status(201).json({
            success: false,
            message: "something wrong9"
          })
    }
}

  module.exports = {
    addUser,
    getallUser,
    getoneUser,
    updateUser,
    deleteUser,
    uploadimage,
    loginUser,
  }