const User=require("../model/user")

exports.uploadPhoto = (req, res) => {
    const id = req.body._id;
    const name=req.body.name
 const filename=req.file.filename
    
    User.findOneAndUpdate(
      { _id: id },
      { $set: { name: name ,photo_status:1,filename:filename} },{upsert:true}
      // { maxTimeMS: 20000 }
    )
      .then((response) => {
        
        if (!response) {
          return res
            .status(400)
            .json({ err: "Error in adding/updating project" });
        }
        return res.status(200).json({ msg: "Photo added successfully" });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.updateStatus=(req,res)=>{

    const userId= req.body.userId;
    

    User.findOneAndUpdate({_id:userId},{$set:{photo_status:2}}).then((data)=>{
        
        return res.status(200).json({message:"Status update succesfully"})

    }).catch((err)=>{
        return res.status(400).json({"error":err})
    })

}

exports.getAllUsers=(req,res)=>{

    User.find({role:0}).then(data=>{

        if(!data){
            return res.status(400).json({error:"No data found"})
        }

        return  res.status(200).json({data:data})

    }).catch(err=>{

        return res.status(400).json({error:err})
    })


}

exports.deleteUser=(req,res)=>{

    const userId= req.body.userId;
    

    User.findOneAndDelete({_id:userId}).then((data)=>{
        
        return res.status(200).json({message:"User Delete  succesfully"})

    }).catch((err)=>{
        return res.status(400).json({"error":err})
    })

}


exports.getUser=(req,res)=>{

    const userId=req.body._id;

    User.findOne({_id:userId}).then(data=>{

        if(!data){
            return res.status(400).json({message:"User not found"})
        }

        return res.status(200).json({data:data})

    }).catch(err=>{

        return res.status(400).json({"error":err})

    })

}