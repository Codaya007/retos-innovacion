from app import db
from datetime import datetime

class Waste(db.Model):
    __tablename__ = 'waste'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), default='kg')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Location (Simple lat/long)
    lat = db.Column(db.Float, nullable=True)
    long = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'quantity': self.quantity,
            'unit': self.unit,
            'location': {'lat': self.lat, 'long': self.long},
            'owner_id': str(self.user_id)
        }
