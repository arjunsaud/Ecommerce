class OfferServices {
  Offer;
  constructor(Offer) {
    this.Offer = Offer;
  }

  async createOffer(data) {
    try {
      const offer = await this.Offer.create({
        ...data,
      });
      return offer;
    } catch (error) {
      throw error;
    }
  }

  async getOffer() {
    try {
      const offers = await this.Offer.find();
      return offers;
    } catch (error) {
      throw error;
    }
  }

  async deleteOffer(id) {
    try {
      const offer = await this.Offer.deleteOne({ _id: id });
      return offer;
    } catch (error) {
      throw error;
    }
  }
}

export default OfferServices