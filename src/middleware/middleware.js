const customerController = require('../controller/customerController')
const cardController = require('../controller/cardController')

//=======================// customer middleware //=========================================
let customer = async function(req,res){
    try {
        let {create, get, dlt} = req.body
        if(create=="yes"){
            customerController.createCustomer(req,res)
        }
        else if(get=="yes"){
            customerController.getCustomer(req,res)
        }
        else if(dlt=="yes"){
            customerController.deleteCustomer(req,res)
        }
        
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}

//========================// card middleware //==============================================

let card = async function(req,res){
    try {
        let {create, get} = req.body
        if(create=="yes"){
            cardController.createCard(req,res)
        }
        else if(get=="yes"){
            cardController.getCard(req,res)
        }
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
}

        module.exports = {customer, card}