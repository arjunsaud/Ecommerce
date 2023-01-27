import OfferServices from "./links.index.js";

const LinksController = {
  createFaq: async (req, res) => {
    try {
      const data = req.body;
      const faq = await OfferServices.createFaq(data);
      res.status(200).json(faq);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  getFaq: async (req, res) => {
    try {
      const faq = await OfferServices.getFaq();
      res.status(200).json(faq);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },

  deleteFaq: async (req, res) => {
    try {
      const id = req.params.id;
      const faq = await OfferServices.deleteFaq(id);
      res.status(200).json(faq);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};

export default LinksController;
