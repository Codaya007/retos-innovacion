from flask import Blueprint, request, jsonify
from app.services import waste_service
from app.utils.security import token_required

waste_bp = Blueprint('waste', __name__)

@waste_bp.route('', methods=['POST'])
@token_required
def create_waste(current_user):
    data = request.get_json()
    try:
        waste = waste_service.create_waste(data, current_user.id)
        return jsonify(waste.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@waste_bp.route('/me', methods=['GET'])
@token_required
def get_my_inventory(current_user):
    inventory = waste_service.get_user_inventory(current_user.id)
    return jsonify([item.to_dict() for item in inventory]), 200
