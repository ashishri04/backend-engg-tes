const customerModel = require('../model/customerModel')
const {v4 : uuidv4} = require('uuid')


//================================// Create Customer //=================================================

const createCustomer = async function(req,res){
    try {
        let details = req.body
        let {firstName, lastName, mobileNumber, DOB, emailID, address, status} = details
        details.customerID = uuidv4()

        if(!firstName){
           return res.status(404).send({status:false, message: "First Name is not present"})
       }
       
       if (!/^[a-zA-Z]+$/.test(firstName)) {
           return res.status(400).send({ status: false, msg: "First Name is invalid" })
       }
        if(!lastName){
           return res.status(404).send({status:false, message: "Last Name is not present"})
       }
       if (!/^[a-zA-Z]+$/.test(lastName)){
           return res.status(400).send({ status: false, msg: "Last Name is invalid" })
       }
        if(!mobileNumber){
           return res.status(404).send({status:false, message: "Mobile Number is not present"})
       }
       if (!/^[0]?[6789]\d{9}$/.test(mobileNumber)) {
           return res.status(400).send({ status: false, msg: "Mobile Number is invalid" })
       }
        if(!DOB){
           return res.status(404).send({status:false, message: "DOB is not present"})
       }
        if(!/^\d{4}-\d{2}-\d{2}$/.test(DOB)){
           return res.status(404).send({status:false, message: "DOB is not valid"})
       }
        if(!emailID){
           return res.status(404).send({status:false, message: "Email Id is not present"})
       }
       if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID)){
           return res.status(400).send({ status: false, msg: "email is invalid" })
       }
        if(!address){
           return res.status(404).send({status:false, message: "Address is not present"})
       }
        if(!status){
           return res.status(404).send({status:false, message: "Status is not present"})
       }
       if(!["ACTIVE","INACTIVE"].includes(status)){
        return res.status(400).send({status:false,message:"Pls provide status only from - ( ACTIVE , INACTIVE )"})
       }
       let customerData = await customerModel.create(details)
       return res.status(201).send({status:true, Data:customerData})
       
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
  }

  //================================// get customer //=============================================

const getCustomer = async function(req,res){
    try {
        let getData = await customerModel.find({status:"ACTIVE"})
        return res.status(200).send({status:true, Data:getData})
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})   
    }
} 

//==================================// delete customer //==========================================

const deleteCustomer = async function(req,res){
    try {
        let {customerID}=req.body
        if(!customerID){
        return res.status(400).send({status:false,message:"Pls provide CustomerID"})
        }
        let customerExists = await customerModel.findOne({customerID})
        if(!customerExists){
            return res.status(404).send({status:false,message:"No customer found"})
        }
        await customerModel.deleteOne({customerID})
        return res.status(200).send({status:true})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {createCustomer, getCustomer, deleteCustomer}


      
