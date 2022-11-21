from flask import Flask
from config import Config
from flask_migrate import Migrate
from .models import db, Customer
from flask_cors import CORS

# import blueprint
from app.auth.routes import auth
from app.products.routes import products

app = Flask(__name__)
CORS(app)



app.config.from_object(Config)

# registering your blueprint
app.register_blueprint(auth)
app.register_blueprint(products)



# initialize our database to work with our app
db.init_app(app)
migrate = Migrate(app, db)


from . import routes
from . import models