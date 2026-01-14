from flask import Blueprint, jsonify
from app.utils.security import token_required

match_bp = Blueprint('matches', __name__)

@match_bp.route('/suggestions', methods=['GET'])
@token_required
def get_matches(current_user):
    # TODO: Connect to LangChain/LLM here
    # For now, return the Mock data the frontend expects
    mock_recipes = [
        {
            'id': '1',
            'productName': 'Acoustic Insulation Panels',
            'distance': '2.5 km',
            'companyB': 'Textiles Inc.',
            'ingredientA': {'type': 'Epoxy Resin Residue'},
            'ingredientB': {'type': 'Denim Scraps'},
            'aiExplanation': 'Mixing resin with denim fibers creates a dense material...'
        }
    ]
    return jsonify(mock_recipes), 200
