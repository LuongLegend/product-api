const { Op } = require("sequelize");
const {
  product,
  shop,
  user,
  category,
  productCategory,
} = require("../models/index");

const getProducts = async (query) => {
  try {
    let { page, limit, keyword, type, priceLte, priceGte } = query;
    page = isNaN(page) ? 1 : parseInt(page);
    limit = isNaN(limit) ? 10 : parseInt(limit);
    const offset = (page - 1) * limit;

    let condition = {};
    if (type) {
      condition.type = {
        [Op.in]: [...type],
      };
    }
    if (keyword) {
      condition = {
        ...condition,
        [Op.or]: [
          {
            title: {
              [Op.substring]: keyword,
            },
          },
          {
            description: {
              [Op.substring]: keyword,
            },
          },
          {
            summary: {
              [Op.substring]: keyword,
            },
          },
        ],
      };
    }

    if (priceLte && !isNaN(priceLte)) {
      condition.price = {
        [Op.lte]: Number(priceLte),
      };
    }
    if (priceGte && !isNaN(priceGte)) {
      condition.price = {
        ...condition.price,
        [Op.gte]: Number(priceGte),
      };
    }

    const products = await product.findAll({
      where: {
        ...condition,
      },
      include: [
        {
          model: shop,
          attributes: ["title", "img"],
        },
        {
          model: user,
          attributes: ["username"],
        },
        {
          model: productCategory,
          attributes: ["id"],
          include: {
            model: category,
            attributes: ["id", "title", "metaTitle", "slug", "content"],
          },
        },
      ],
      limit,
      offset,
    });

    return {
      code: 200,
      data: products,
    };
  } catch (error) {
    console.log(error.message);
    return {
      code: 500,
      msg: error.message,
    };
  }
};

const getProductById = async (id) => {
  try {
    const result = await product.findByPk(id);
    return {
      code: 200,
      data: result,
    };
  } catch (error) {
    console.log(error.message);
    return {
      code: 500,
      msg: error.message,
    };
  }
};

module.exports = {
  getProducts,
  getProductById,
};
