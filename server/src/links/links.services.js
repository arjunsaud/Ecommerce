
class LinksServices {
  Links;
  constructor(Links) {
    this.Links = Links;
  }

  async createFaq(data) {
    try {
      const faq = await this.Links.create({
        ...data,
      });
      return faq;
    } catch (error) {
      throw error;
    }
  }

  async getFaq() {
    try {
      const faq = await this.Links.find();
      return faq;
    } catch (error) {
      throw error;
    }
  }

  async deleteFaq(id) {
    try {
      const faq = await this.Links.deleteOne({ _id: id });
      return faq;
    } catch (error) {
      throw error;
    }
  }

  
}

export default LinksServices