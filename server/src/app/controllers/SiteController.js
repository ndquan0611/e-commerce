const slugify = require('slugify');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const data = require('../../../../data/ecommerce.json');
const categoryData = require('../../../../data/cate_brand');

const createProduct = async (product) => {
    try {
        // Nếu danh mục tồn tại, sử dụng ObjectId của danh mục đã có
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
            color: product?.variants?.find((e) => e.label === 'Color')?.variants[0],
            thumb: product?.thumb,
            totalRatings: 4,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const createProductCategory = async (category) => {
    const existingCategory = await ProductCategory.findOne({ title: category?.cate });

    if (!existingCategory) {
        await ProductCategory.create({
            title: category?.cate,
            brand: category?.brand,
        });
    } else {
        console.log(`Danh mục "${category?.cate}" đã tồn tại.`);
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
