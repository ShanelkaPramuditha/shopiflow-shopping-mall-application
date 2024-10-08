import {
  addPromotionAmount,
  addPromotionPercentage,
  deletePromotionType1,
  deletePromotionType2,
  getAllPromotions,
  getPromotionsByShopId,
  getPromotionType1ById,
  getPromotionType2ById,
  updatePromotionType1,
  updatePromotionType2
} from '../services/promotion.service.js';

export const PromotionController = {
  async promotions(req, res) {
    try {
      
      const promotions = await getAllPromotions();

      return res.status(200).json({
        promotions
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getpromotionsbyshopid(req, res) {
    try {
      const promotions = await getPromotionsByShopId(req.params.id);

      return res.status(200).json({
        promotions
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async addpromotiontype1(req, res) {
    try {
      // Await the result of the addPromotionPercentage function
      const promotion = await addPromotionPercentage(req);
      // Send a success response with the promotion data
      return res.status(200).json({
        promotion
      });
    } catch (error) {
      console.error('Error adding promotion:', error);

      // Send an error response with the error message
      return res.status(500).json({ message: error.message });
    }
  },

  async addpromotiontype2(req, res) {
    try {
      const promotion = await addPromotionAmount(req.body);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getPromotiontype1ById(req, res) {
    try {
      const promotion = await getPromotionType1ById(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getPromotiontype2ById(req, res) {
    try {
      const promotion = await getPromotionType2ById(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async updatePromotionType1(req, res) {
    try {
      const promotion = await updatePromotionType1(req.params.id, req.body);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async updatePromotionType2(req, res) {
    try {
      const promotion = await updatePromotionType2(req.params.id, req.body);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async deletePromotionType1(req, res) {
    try {
      const promotion = await deletePromotionType1(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async deletePromotionType2(req, res) {
    try {
      const promotion = await deletePromotionType2(req.params.id);

      return res.status(200).json({
        promotion
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
