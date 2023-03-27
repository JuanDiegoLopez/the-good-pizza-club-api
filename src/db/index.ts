import AppDataSource from './data-source';
import * as fs from 'fs/promises';

async function insertUsers(queryRunner, users) {
  users.forEach(async (user) => {
    const { id, name, email, phone, role, password } = user;

    await queryRunner.query(
      `INSERT INTO user ("id", "name", "email", "phone", "role", "password") VALUES (${id}, "${name}", "${email}", "${phone}", "${role}", "${password}")`,
    );
  });
}

async function insertProducts(queryRunner, products) {
  products.forEach(async (product) => {
    const { id, name, description, price, weight, calories, image, color } =
      product;

    await queryRunner.query(
      `INSERT INTO product ("id", "name", "description", "price", "weight", "calories", "image", "color") VALUES (${id}, "${name}", "${description}", ${price}, ${weight}, ${calories}, "${image}", "${color}")`,
    );
  });
}

async function insertPromotions(queryRunner, promotions) {
  promotions.forEach(async (promotion) => {
    const { id, name, description, image, discount, productId, sizeId } =
      promotion;

    await queryRunner.query(
      `INSERT INTO promotion ("id", "name", "description", "image", "discount", "productId", "sizeId") VALUES (${id}, "${name}", "${description}", "${image}", ${discount}, ${productId}, ${sizeId})`,
    );
  });
}

async function insertRecords(queryRunner, records) {
  records.forEach(async (record) => {
    const { id, name, type, price } = record;

    await queryRunner.query(
      `INSERT INTO record ("id", "name", "type", "price") VALUES (${id}, "${name}", "${type}", ${price})`,
    );
  });
}

async function loadData() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
    await AppDataSource.synchronize();

    const users = JSON.parse(
      await fs.readFile(__dirname + '/seeds/users.json', 'utf-8'),
    );
    const products = JSON.parse(
      await fs.readFile(__dirname + '/seeds/products.json', 'utf-8'),
    );
    const promotions = JSON.parse(
      await fs.readFile(__dirname + '/seeds/promotions.json', 'utf-8'),
    );
    const records = JSON.parse(
      await fs.readFile(__dirname + '/seeds/records.json', 'utf-8'),
    );

    const queryRunner = AppDataSource.createQueryRunner();

    await insertUsers(queryRunner, users);
    await insertRecords(queryRunner, records);
    await insertProducts(queryRunner, products).then(async () => {
      await insertPromotions(queryRunner, promotions);
    });
  } catch (error) {
    console.log(error);
  }
}

loadData();
