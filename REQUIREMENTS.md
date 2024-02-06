# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
Routes to access each endpoint were added to the right of each API endpoint requirement

#### Products
- Index - */products (GET)*
- Show - */products/<product_id> (GET)*
- Create [token required] - */products (POST)*
- [OPTIONAL] Top 5 most popular products - */five_most_popular_products (GET)*
- [OPTIONAL] Products by category (args: product category) - */products?category=<category> (GET)*

#### Users
- Index [token required] - */users (GET)*
- Show [token required] - */users/<user_id> (GET)*
- Create [token required] - */users (POST)*

#### Orders
- Current Order by user (args: user id)[token required] - */current_order?user_id=<user_id> (GET)*
- [OPTIONAL] Completed Orders by user (args: user id)[token required] */completed_orders?user_id=<user_id> (GET)*

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema
**products**

| column     | data type      |
| ---------- | -------------- |
| id         | primary key    |
| name       | varchar(100)   |
| category   | varchar(64)    |

**users**

| column            | data type      |
| ----------------- | -------------- |
| id                | primary key    |
| first_name        | varchar(100)   |
| last_name         | varchar(64)    |
| password_digest   | varchar        |


**orders**

| column    | data type     |
| --------- | ------------- |
| id        | primary key   |
| status    | varchar(64)   |
| user_id   | bigint        |


**order_products**

| column       | data type     |
| ------------ | ------------- |
| id           | primary key   |
| quantity     | integer       |
| order_id     | bigint        |
| product_id   | bigint        |