from flask import Blueprint, request, jsonify
from app.services import auth_service

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        user, token = auth_service.register_user(data)
        return jsonify({
            'user': user.to_dict(),
            'token': token
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user, token = auth_service.login_user(data)
        return jsonify({
            'user': user.to_dict(),
            'token': token
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401
