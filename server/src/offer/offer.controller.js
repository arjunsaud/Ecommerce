import OfferServices from "./offer.index.js";

const OfferController = {
  createOffer: async (req, res) => {
    try {
      const data = req.body;
      const offer = await OfferServices.createOffer(data);
      res.status(200).json(offer);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  getOffer: async (req, res) => {
    try {
      const offers = await OfferServices.getOffer();
      res.status(200).json(offers);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  deleteOffer: async (req, res) => {
    try {
      const id = req.params.id;
      const offer = await OfferServices.deleteOffer(id);
      res.status(200).json(offer);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};

export default OfferController;
