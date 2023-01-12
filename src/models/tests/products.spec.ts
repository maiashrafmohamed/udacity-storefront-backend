import { ProductsModel } from '../products';

const productModel = new ProductsModel();
let id: number;

describe('Products Model', () => {
  beforeAll(async () => {
    const res = await productModel.create({
      name: 'iphone 13',
      price: 25000,
      category: 'Mobile'
    });
    id = res.id as number;
  });

  it('Shoud get all products when call index method', async () => {
    const products = await productModel.index();
    expect(products.length).toBeGreaterThan(1);
  });

  it('Should create new product when call create method and return added product', async () => {
    const product = await productModel.create({
      name: 'Samsung s22',
      price: 25000,
      category: 'Mobile'
    });
    delete product.id;
    expect(product).toEqual({
      name: 'Samsung s22',
      price: 25000,
      category: 'Mobile'
    });
  });

  it('should return a specific product when call get product by id show method', async () => {
    const product = await productModel.show(id);

    expect(product).toEqual({
      name: 'iphone 13',
      price: 25000,
      category: 'Mobile',
      id: id
    });
  });

  it('should return all product with same category when call getProductsByCategory method', async () => {
    const products = await productModel.getProductsByCategory('Mobile');

    expect(products.length).toBeGreaterThan(1);
  });

  it('should update a specific product when call update method', async () => {
    const product = await productModel.update({
      name: 'iphone 13 pro Max',
      price: 25000,
      category: 'Mobile',
      id: id
    });

    expect(product).toEqual({
      name: 'iphone 13 pro Max',
      price: 25000,
      category: 'Mobile',
      id: id
    });
  });

  it('should DELETE a specific product when call delete method', async () => {
    const product = await productModel.delete(id);

    expect(product).toEqual({
      name: 'iphone 13 pro Max',
      price: 25000,
      category: 'Mobile',
      id: id
    });
  });
});
