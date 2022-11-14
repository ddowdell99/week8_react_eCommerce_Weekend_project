from flask import Blueprint, request
from app.models import Customer
from werkzeug.security import check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/api/signup', methods=["POST"])
def signUpCustomerAPI():

            data = request.json
            username = data['username']
            firstname = data['firstname']
            lastname = data['lastname']
            email = data['email']
            password = data['password']

            username_check = Customer.query.filter_by(username=username).first()
            email_check = Customer.query.filter_by(email=email).first()

            if username_check and email_check:
                return {
                    'status': 'not ok',
                    'message': 'That username AND email already belong to an acount.'
                    }
            elif username_check:
                return {
                    'status': 'not ok',
                    'message': 'That username already belongs to an acoount'
                    }  
            elif email_check:
                return {
                    'status': 'not ok',
                    'message': 'That email already belongs to an acoount'
                    }
            else:

                # Adding user to database/ instantiate someone new
                customer = Customer(username, firstname, lastname, email, password)
                
                # Adding instance to SQL
                customer.saveToDB()
                return {
                    'status': 'ok',
                    'message': 'Successfully created a user',
                }
               
@auth.route('/api/login', methods=["POST"])
def logInCustomerAPI():

    data = request.json
    username = data['username']
    password = data['password']
    
    customer = Customer.query.filter_by(username=username).first()
    if customer:
        if check_password_hash(customer.password, password):
            return {
                'status': 'ok',
                'message': f'Succesfully logged in. Welcome back, {customer.username}!',
                'customer': customer.to_dict()
            }
            

        return {
            'status': 'not ok',
            'message': 'Incorrect password.'
        }

    return {
            'status': 'not ok',
            'message': 'A user with that username does not exist.'
        }

