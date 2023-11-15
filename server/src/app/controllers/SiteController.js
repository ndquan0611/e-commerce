const slugify = require('slugify');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const data = require('../../../../data/ecommerce.json');
const categoryData = require('../../../../data/cate_brand');

const createProduct = async (product) => {
    try {
        await Product.create({
            title: product?.name,
            slug: slugify(product?.name) + Math.round(Math.random() * 100) + '',
            description: product?.description,
            brand: product?.brand,
            price: Math.round(Number(product?.price?.match(/\d/g).join(''))),
            category: product?.category[1],
            quantity: Math.round(Math.random() * 1000),
            sold: Math.round(Math.random() * 100),
            images: product?.images,
            color: product?.variants?.find((e) => e.label === 'Color')
                ?.variants[0],
        });
    } catch (error) {
        throw new Error(error);
    }
};

const createProductCategory = async (category) => {
    try {
        await ProductCategory.create({
            title: category?.cate,
            brand: category?.brand,
        });
    } catch (error) {
        throw new Error(error);
    }
};

class SiteController {
    async insertProduct(req, res, next) {
        try {
            const promises = [];
            for (let product of data) {
                promises.push(createProduct(product));
            }
            await Promise.all(promises);
            return res.json('Done');
        } catch (error) {
            next(error);
        }
    }

    async insertProductCategory(req, res, next) {
        try {
            const promises = [];
            for (let category of categoryData) {
                promises.push(createProductCategory(category));
            }
            await Promise.all(promises);
            return res.json('Done');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SiteController();
