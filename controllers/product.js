const { Op } = require("sequelize");
const {
  product,
  shop,
  user,
  category,
  productCategory,
} = require("../models/index");
const { returnSuccess, returnError } = require("./config");

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

    return returnSuccess(products);
  } catch (error) {
    console.log(error.message);
    return returnError(500, error.message);
  }
};

const getProductById = async (id) => {
  try {
    const result = await product.findByPk(id);
    return returnSuccess(result);
  } catch (error) {
    console.log(error.message);
    return returnError(500, error.message);
  }
};

const addProduct = async (data) => {
  try {
    const {
      userId,
      shopId,
      title,
      frontImg,
      backImg,
      summary,
      description,
      sku,
      price,
      quantity,
      categories,
    } = data;

    if (!userId || !shopId || !title || !description || !sku) {
      return returnError(400, "missing information");
    }

    const result = await product.create(data, {
      fields: [
        "userId",
        "shopId",
        "title",
        "metaTitle",
        "slug",
        "summary",
        "description",
        "frontImg",
        "backImg",
        "sku",
        "price",
      ],
    });
    return returnSuccess(result);
  } catch (error) {
    console.log(error);
    return returnError(500, error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
};
