from flask import Blueprint, request
from app.models import Customer, Product, Cart
from app.apiauthhelper import token_required


products = Blueprint('products', __name__)

@products.get('/api/products')
def getProductsAPI():
    products = Product.query.all()
    new_product = [p.to_dict() for p in products]
    return {
        'status': 'ok',
        'data': new_product
        
    }

@products.get('/api/products/<int:post_id>')
def getSingleProductAPI(prod_id):
    product = Product.query.get(prod_id)
    if product:
        return {
            'status': 'ok',
            'data': product.to_dict()
        }
    return {
        'status': 'not ok',
        'message': 'That product does not exist. Try agin.'
    }

@products.post('/api/cart/add')
@token_required
def addProduct(user):

    data = request.json
    prod_id = data['prod_id']

    product = Product.query.get(prod_id)

    if product:
        user.addToCart(product)
        return {
            'status': 'ok',
            'message': 'Successfully added item to cart'
        }

    return {
        'status': 'not ok',
        'message': 'product may not exist'
    }

@products.get('/api/cart')
@token_required
def showCart(user):
    cart = [Product.query.get(c.prod_id).to_dict() for c in Cart.query.filter_by(user_id=user.id).all()]
    return {
        'status': 'ok',
        'data': cart
    }


