from flask import Blueprint
from app.models import Customer, Product, cartTable
from app.grabProductFunction import getProd

products = Blueprint('products', __name__)

