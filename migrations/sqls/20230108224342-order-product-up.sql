/* Replace with your SQL commands */
CREATE TABLE order_product (
    id SERIAL PRIMARY  KEY,
    order_id INTEGER NOT NULL REFERENCES "orders"(id),
    product_id INTEGER NOT NULL REFERENCES "products"(id),
    quantity integer
);