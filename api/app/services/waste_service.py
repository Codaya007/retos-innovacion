from app import db
from app.models.waste import Waste

def create_waste(data, user_id):
    new_waste = Waste(
        user_id=user_id,
        type=data['materialType'],  # Matches frontend key
        quantity=float(data['quantity']),
        unit=data.get('unit', 'kg'),
        lat=0.0, # Placeholder: Should come from frontend GPS
        long=0.0
    )
    db.session.add(new_waste)
    db.session.commit()
    return new_waste

def get_user_inventory(user_id):
    return Waste.query.filter_by(user_id=user_id).all()
