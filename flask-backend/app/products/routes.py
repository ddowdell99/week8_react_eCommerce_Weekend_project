from flask import Blueprint, request
from app.models import Customer, Product, cartTable
from app.grabProductFunction import getProd

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

@products.route('/add')
def addProduct():

    data = request.json
    cust_id = data['cust_id']
    prod_id = data['prod_id']

    Customer.addToCart(cust_id, prod_id)

@products.get('/api/cart')
def showCart():
    cart = cartTable.query.all()
    eachItem = [i.to_dict() for i in cart]
    return {
        'status': 'ok',
        'data': eachItem
    }


