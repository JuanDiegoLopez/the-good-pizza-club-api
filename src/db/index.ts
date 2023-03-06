import AppDataSource from './data-source';
import * as fs from 'fs/promises';

async function loadData() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
    await AppDataSource.synchronize();

    const products = JSON.parse(
      await fs.readFile(__dirname + '/seeds/products.json', 'utf-8'),
    );
    const promotions = JSON.parse(
      await fs.readFile(__dirname + '/seeds/promotions.json', 'utf-8'),
    );

    const queryRunner = AppDataSource.createQueryRunner();

    products.forEach(async (product) => {
      const { id, name, description, price, weight, calories, image, color } =
        product;
      await queryRunner.query(
        `INSERT INTO product ("id", "name", "description", "price", "weight", "calories", "image", "color") VALUES (${id}, "${name}", "${description}", ${price}, ${weight}, ${calories}, "${image}", "${color}")`,
      );
    });

    promotions.forEach(async (promotion) => {
      const { id, name, description, image, productId } = promotion;

      await queryRunner.query(
        `INSERT INTO promotion ("id", "name", "description", "image", "productId") VALUES (${id}, "${name}", "${description}", "${image}", ${productId})`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

loadData();
