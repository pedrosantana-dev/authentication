const mongoose = require('mongoose');
const faker = require('faker');
const ProductModel = require('../models/ProductModel');
const PersonModel = require('../models/PersonModel');

mongoose.connect('mongodb://localhost:27017/auth_test',
    { useNewUrlParser: true });

async function addProducts(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new ProductModel({
                name: faker.commerce.productName(),
                department: faker.commerce.department(),
                price: faker.commerce.price()
            });
            await p.save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function addPeople(n) {
    try {
        for (let i = 0; i < n; i++) {
            const p = new PersonModel({
                name: faker.name.firstName(),
                country: faker.address.country(),
                email: faker.internet.email(),
                company: faker.company.companyName()
            });
            await p.save();
        }
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-products') {
    let n = process.argv[3] || 100;
    addProducts(n).then(() => {
        console.log('OK');
        mongoose.disconnect();
    });
}
else if (process.argv[2] === '-people') {
    let n = process.argv[3] || 100;
    addPeople(n).then(() => {
        console.log('OK');
        mongoose.disconnect();
    });
}