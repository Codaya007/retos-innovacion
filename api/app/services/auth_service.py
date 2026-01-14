import jwt
import datetime
import bcrypt
from app import db
from app.models.user import User
from flask import current_app

def register_user(data):
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        raise Exception('Email already registered')

    # Hash password
    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_pw,
        role=data['role']
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    token = generate_token(new_user.id)
    return new_user, token

def login_user(data):
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash.encode('utf-8')):
        raise Exception('Invalid credentials')

    token = generate_token(user.id)
    return user, token

def generate_token(user_id):
    payload = {
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1),
        'iat': datetime.datetime.now(datetime.timezone.utc),
        'sub': user_id
    }
    return jwt.encode(payload, current_app.config.get('SECRET_KEY'), algorithm='HS256')
