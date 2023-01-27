import BuyService from "./buy.index.js";

const BuyController = {
  getBuy: async (req, res) => {
    const id = req.params.id;
    const product = await BuyService.getBuy(id);
    res.status(200).json(product);
    try {
    } catch (error) {
      res.status(400).json(error.message);
    }
  },

  getAll:async(req,res)=>{
    const product = await BuyService.getAll();
    res.status(200).json(product);
    try {
    } catch (error) {
      res.status(400).json(error.message);
    } 
  },

  addBuy: async (req, res) => {
    const { fullname, address, email } = req.body;
    const data = req.body;
    const id = req.body.userid;
    delete data.fullname;
    delete data.address;
    delete data.email;
    data.products[0].fullname = fullname;
    data.products[0].email = email;
    data.products[0].address = address;
    try {
      const resp = await BuyService.addBuy(data, id);
      res.status(200).json(resp);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};

export default BuyController;
