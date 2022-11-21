from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash
from secrets import token_hex

db = SQLAlchemy()

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('customer.cust_id'), nullable=False)
    prod_id = db.Column(db.Integer, db.ForeignKey('product.prod_id'), nullable=False)

class Customer(db.Model):
    cust_id = db.Column(db.Integer, primary_key=True)
    id = cust_id
    username = db.Column(db.String(50), nullable=False, unique=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    apitoken = db.Column(db.String, default=None, nullable=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    cart = db.relationship(
        'Product',
        secondary = 'cart',
        backref = 'shopper',
        lazy = 'dynamic'
    )

    def __init__(self, firstname, lastname, username, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.apitoken = token_hex(16)

    def modify(self, firstname, lastname, username, email, password=None):
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.email = email
        if password:
            self.password = generate_password_hash(password)
        db.session.commit()
    
    def saveToDB(self):
        db.session.add(self)
        db.session.commit()

    def addToCart(self, product):
        self.cart.append(product)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstname,
            'lastName': self.lastname,
            'username': self.username,
            'email': self.email,
            'token': self.apitoken
        }

class Product(db.Model):
    prod_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(2500), nullable=False)
    category = db.Column(db.String(150), nullable=False)
    image = db.Column(db.String(250), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    ratings_count = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, prod_id, name, price, description, category, image, rating, ratings_count):
        self.id = prod_id
        self.name = name
        self.price = price
        self.description = description
        self.category = category
        self.image = image
        self.rating = rating
        self.ratings_count = ratings_count

    def modify(self, name, price, description, category, image, rating, ratings_count):
        self.name = name
        self.price = price
        self.description = description
        self.category = category
        self.image = image
        self.rating = rating
        self.ratings_count = ratings_count
        db.session.commit()

    def saveToDB(self):
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.prod_id,
            'name': self.name,
            'image': self.image,
            'description': self.description,
            'price': self.price
        }
