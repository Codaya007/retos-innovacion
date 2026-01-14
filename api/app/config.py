import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hj12h67712yu'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URI') or 'postgresql://postgres:password@localhost:5432/ecosymbiosis'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
