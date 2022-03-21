## Description

This is a website for selling balloons. Here user can find a page with bouquets with price filter, a page with separate ballons with price, color and catagery filters. Also, there are pages with assortment and prices, calculator, cart, contacts and delivery and payments terms. Admin can use admin panel for editing data.

The website consists of admin, server and client parts.

Tools:

Client was written with React, Next.js. Apollo Client, Bootstrap, Typescript.
Server was written with Express, Graphql, Prisma, Apollo Server, Google Storage, Typescript.
Admin was written with React create app, Apollo Client, Typescript.

## Server installation

### Step 1

#### `cd ./server`

### Step 2

#### `yarn install`

### Step 3

#### `yarn migrate`

In order to make this step successfully user should have postgres installed on local machine, and create new database named 'sharikusa'.

### Step 4

#### `yarn run dev`

## Admin installation

### Step 1

#### `cd ./admin`

### Step 2

#### `yarn install`

### Step 3

#### `yarn start`

## Client installation

### Step 1

#### `cd ./client`

### Step 2

#### `yarn install`

### Step 3

#### `yarn run dev`

## Troubleshooting

If the server launch gives error, try install ts-node npm package globally
