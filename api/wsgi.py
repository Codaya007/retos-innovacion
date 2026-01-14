from app import create_app, db

app = create_app()

# Import models to ensure Migration script detects them
from app.models.user import User
from app.models.waste import Waste

if __name__ == '__main__':
    # '0.0.0.0' is crucial for React Native (on phone) to see localhost
    app.run(host='0.0.0.0', port=8000, debug=True)
