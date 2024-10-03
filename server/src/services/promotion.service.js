import DiscountPercentageSchema from '../models/promotion.model/promotionondiscountpercentage.model.js';
import DiscountAmount from '../models/promotion.model/promotionondiscountamount.model.js';
// Get all promotions
export const getAllPromotions = async () => {
  try {
    // Find all promotions
    const discountPercentage = await DiscountPercentageSchema.find();
    const discountAmount = await DiscountAmount.find();
    console.log('test controller');

    return {
      discountPercentage,
      discountAmount
    };
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const getPromotionType1ById = async (id) => {
  try {
    const promotion = await DiscountPercentageSchema.findById(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const getPromotionType2ById = async (id) => {
  try {
    const promotion = await DiscountAmount.findById(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const deletePromotionType1 = async (id) => {
  try {
    const promotion = await DiscountPercentageSchema.findByIdAndDelete(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

export const deletePromotionType2 = async (id) => {
  try {
    const promotion = await DiscountAmount.findByIdAndDelete(id);
    return promotion;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Add a new promotion type percentage discount

export const addPromotionPercentage = async (data) => {
  try {
    const { promotionType, storeName, startDate, endDate, description, discountPercentage, photo } =
      data.body;

    console.log('data photo: ', data.body);

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        status: 400,
        message: 'Invalid Date format for startDate or endDate'
      };
    }

    const isActive = now >= start && now <= end;

    const newPromotion = new DiscountPercentageSchema({
      promotionType: 1,
      storeName,
      discountPercentage,
      startDate: start,
      endDate: end,
      description,
      isActive,
      photo
    });
    console.log('new promotion:', newPromotion);

    const savedPromotion = await newPromotion.save();
    return savedPromotion;
  } catch (error) {
    console.error('Error saving promotion:', error);
    if (!error.status) {
      error.status = 500;
      error.message = 'Failed to save the promotion';
    }
    throw error;
  }
};

export const addPromotionAmount = async (data) => {
  try {
    const {
      promotionType,
      storeName,
      startDate,
      endDate,
      description,
      discountAmount,
      qualifyingPurchaseAmount,
      photo
    } = data;

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        status: 400,
        message: 'Invalid Date format for startDate or endDate'
      };
    }

    const isActive = now >= start && now <= end;

    const newPromotion = new DiscountAmount({
      promotionType: 3,
      storeName,
      discountAmount,
      qualifyingPurchaseAmount,
      startDate: start,
      endDate: end,
      description,
      isActive,
      photo
    });

    const savedPromotion = await newPromotion.save();
    return savedPromotion;
  } catch (error) {
    console.error('Error saving promotion:', error);
    if (!error.status) {
      error.status = 500;
      error.message = 'Failed to save the promotion';
    }
    throw error;
  }
};
