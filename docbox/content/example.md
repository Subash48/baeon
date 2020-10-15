<!-- ## BAEON

This is our BAEON API. You can use this API to promote 
your business by offering promotional offers. Our API
allows you to inculcate a new ecosystem where all people consumers, merchants, third-party service providers and others – have an opportunity to flourish. -->
## API endpoints

For every request , suffix `https://baeon.co/api`

### Add Coupon 

Standard Coupon Addition page
<a href="http://localhost:5000/api/couponPage?apikey=XSBG0Q7-6VK4FN4-GMJPNE3-GYD8X70" target="_blank">Test Link!</a>

```endpoint
GET /couponPage?apikey={YOUR_API_KEY}
```

#### Example request

```curl
<a href="https://baeon.co/api/couponPage?apikey={YOUR API KEY}"></a>
```

```bash
<a href="https://baeon.co/api/couponPage?apikey={YOUR API KEY}"></a>
```

```javascript
<a href="https://baeon.co/api/couponPage?apikey={YOUR API KEY}"></a>
});
```

```python
<a href="https://baeon.co/api/couponPage?apikey={YOUR API KEY}"></a>
```

### Display Coupons

Lists all coupons for which your account is a host.

Property | Description
---|---
`apikey` |  Access key
`lat`    |  Latitude of user
`long`   |  Longitude of user 

```endpoint
POST /displayCoupons
```

#### Example request

```curl
$ curl -X POST https://baeon.co/api/displayCoupons  
    -d "apikey"={apikey} 
    -d "lat"={latitude}
    -d "long"={longitude}
```

```bash 
https://baeon.co/api/displayCoupons?apikey={Your_API_key}&lat={latitude}&long={longitude} 
```

```javascript
client.listWobbles(function(err, wobbles) {
  console.log(wobbles);
});
```

```python
import requests 

URL = 'https://baeon.co/api/couponPage/displayCoupons'
DATA = {
        'apikey': { API_KEY }, 
        'lat'   : { latitude}, 
        'long'  : {longitude}, 
        } 
requests.get(url = URL, data = DATA).json()
```

#### Example response

```json
[
  {
  "couponTitle" :    "{couponTitle}",
  "couponDesc"  :    "{couponDesc}",
  "isPercent"   :    "{isPercent}",
  "couponId"   :     "{couponId}",
  "couponImageUrl" : "{couponImageUrl}"
  },
  {
   "couponTitle" :    "{couponTitle}",
   "couponDesc"  :    "{couponDesc}",
   "isPercent"   :    "{isPercent}",
   "couponId"   :     "{couponId}",
   "couponImageUrl" : "{couponImageUrl}"
  }
]
```

### Get Coupon Code

Returns a coupon code for coupon Id.

Property | Description
---|---
`apikey` |  Access key
`lat`    |  Latitude of user
`long`   |  Longitude of user 
`couponId`| Coupon Id

```endpoint
POST /getCouponCode
```

#### Example request

```curl
$ curl -X POST https://baeon.co/api/getCouponCode  
    -d "apikey"={apikey} 
    -d "lat"={latitude}
    -d "long"={longitude}
    -d "couponId"={couponId}
```

```bash
$ wbl wobbles create
```

```javascript
client.createWobble({
  name: 'example',
  description: 'An example wobble'
}, function(err, wobble) {
  console.log(wobble);
});
```

```python
response = wobbles.create(
  name='example', description='An example wobble')
```

#### Example request body

```json
{
  "apikey": "{apikey}",
  "lat": "{latitude}",
  "long": "{longitude}",
  "couponId": "{couponId}"
}

```


#### Example response

```json
{
  "code": "{couponCode}",
}
```

### Avail a coupon

Avail coupon for coupon code.


Property | Description
---|---
`apikey` |  Access key
`lat`    |  Latitude of user
`long`   |  Longitude of user 
`couponCode`| Coupon code


```endpoint
POST /availPromo
```

#### Example request

```curl
$ curl -X POST https://baeon.co/api/availPromo  
    -d "apikey"={apikey} 
    -d "lat"={latitude}
    -d "long"={longitude}
    -d "couponId"={couponCode}
```

```bash
$ wbl wobbles create
```

```javascript
client.createWobble({
  name: 'example',
  description: 'An example wobble'
}, function(err, wobble) {
  console.log(wobble);
});
```

```python
response = wobbles.create(
  name='example', description='An example wobble')
```

#### Example request body

```json
{
  "apikey": "{apikey}",
  "lat": "{latitude}",
  "long": "{longitude}",
  "couponCode": "{couponCode}",
  "productId" : "{productId}"
}
```


#### Example response

```json
{
  "amount": "{amount}",
  "type"  : "Discount"
}
```
## Product Inventory

BAEON allows for integration of your product inventory in two ways

    1. Baeon website 
    2. Baeon Api



### Insert a product

Inserts a product into inventory.

```endpoint
POST /product/add
```

#### Example request

```curl
curl https://baeon.co/product/add
  -X PUT \
  -d @file.geojson
```

```bash
$ wbl wobble put-wibble wobble-id wibble-id 'geojson-wibble'
```

```javascript
var wibble = {
  "type": "Wobble",
  "properties": { "name": "Null Island" }
};
client.insertWobble(wibble, 'wobble-id', function(err, wibble) {
  console.log(wibble);
});
```

#### Example request body

```json
{
      "productName" : "{productName}",
      "productDesc" : "{req.body.productDesc}",
      "stock"       : "{req.body.stock}",
      "unitPrice"   : "{req.body.unitPrice}"
}
```

Property | Description
--- | ---
`productName` | the name of the product
`productDesc` | the description of product
`stock` | the stock currently available
`unitPrice` | the unit price of product

#### Example response

```json
{ 
  "msg" : "Product details added successfully" 
}
```

### Update a product

Updates the properties of a particular product.

```endpoint
PATCH /product/{productId}
```

#### Example request

```curl
curl --request PATCH https://baeon.co/api/product/{productId}
  -d @data.json
```

```python
resp = wobbles.update_wobble(
  wobble_id,
  name='updated example',
  description='An updated example wobble'
  ).json()
```

```bash
$ wbl wobble update-wobble wobble-id
```

```javascript
var options = { name: 'foo' };
client.updateWobble('wobble-id', options, function(err, wobble) {
  console.log(wobble);
});
```

#### Example request body

```json
{
  "name": "foo",
  "description": "bar"
}
```

Property | Description
---|---
`productId`   | Unique product ID
`productName` | (optional) the name of the product
`description` | (optional) a description of the product
`stock`       | (optional) current stock of product
`unitPrice`   | (optional) price of product

#### Example response

```json
{
  "message": "Product updated succesfully"
}
```

### Delete a product

Deletes a product

```endpoint
DELETE /product/{product_id}
```

#### Example request

```curl
curl -X DELETE https://baeon.co/api/product/{product_id}
```

```bash
$ wbl wobble delete-wobble wobble-id
```

```python
resp = wobbles.delete_wobble(wobble_id)
```

```javascript
client.deleteWobble('wobble-id', function(err) {
  if (!err) console.log('deleted!');
});
```

#### Example response

> HTTP 204

### List products

List all the products in inventory

```endpoint
GET /api/products?apikey={apikey}
```

#### Example request

```curl
curl https://baeon.co/api/products?apikey={apikey}
```

```bash
$ wbl wobble list-wibbles wobble-id
```

```python
collection = wobbles.list_wibbles(wobble_id).json()
```

```javascript
client.listWobbles('wobble-id', {}, function(err, collection) {
  console.log(collection);
});
```

#### Example response

```json

[
  {
      "productName" : "{productName}",
      "productDesc" : "{req.body.productDesc}",
      "stock"       : "{req.body.stock}",
      "unitPrice"   : "{req.body.unitPrice}"
  },
  {
      "productName" : "{productName}",
      "productDesc" : "{req.body.productDesc}",
      "stock"       : "{req.body.stock}",
      "unitPrice"   : "{req.body.unitPrice}"
  }
]
  
```

### Retrieve a product by id

Retrieves a product based on id.

```endpoint
GET /api/product?id={productid}&apikey={apikey}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```bash
$ wbl wobble read-wibble wobble-id wibble-id
```

```javascript
client.readWobble('wibble-id', 'wobble-id',
  function(err, wibble) {
    console.log(wibble);
  });
```

```python
wibble = wobbles.read_wibble(wobble_id, '2').json()
```

#### Example response

```json
{
      "productName" : "{productName}",
      "productDesc" : "{req.body.productDesc}",
      "stock"       : "{req.body.stock}",
      "unitPrice"   : "{req.body.unitPrice}"
}
```

### Retrieve a product by name

Retrieves a product based on name.

```endpoint
GET /api/product?productName={productName}&?apikey={apikey}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```bash
$ wbl wobble read-wibble wobble-id wibble-id
```

```javascript
client.readWobble('wibble-id', 'wobble-id',
  function(err, wibble) {
    console.log(wibble);
  });
```

```python
wibble = wobbles.read_wibble(wobble_id, '2').json()
```

#### Example response

```json
{
      "productName" : "{productName}",
      "productDesc" : "{req.body.productDesc}",
      "stock"       : "{req.body.stock}",
      "unitPrice"   : "{req.body.unitPrice}"
}
```

