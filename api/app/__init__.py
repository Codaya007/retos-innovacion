
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app) # Allow React Native to communicate

    # Register Blueprints (Routes)
    from .routes.auth_routes import auth_bp
    from .routes.waste_routes import waste_bp
    from .routes.match_routes import match_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(waste_bp, url_prefix='/waste')
    app.register_blueprint(match_bp, url_prefix='/matches')

    return app
