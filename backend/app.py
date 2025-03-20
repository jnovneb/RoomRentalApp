from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Setting up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///room_rental.db'
db = SQLAlchemy(app)

# ===============================
# Defininf models
# ===============================

class User(db.Model):
    """
    User model: they can be searchers or advertiser.
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # "searcher" or "advertiser"
    preferences = db.Column(db.JSON)

class Listing(db.Model):
    """
    Published advertisement models by the advertisers.
    """
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    photos = db.Column(db.JSON)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create tables in the DB if they don´t exist
with app.app_context():
    db.create_all()

# ===============================
# User paths
# ===============================

@app.route('/register', methods=['POST'])
def register():
    """
    Register a user as a searcher or advertiser.
    """
    data = request.json
    username = data.get('username')
    user_type = data.get('type')
    preferences = data.get('preferences', {})

    if user_type not in ['searcher', 'advertiser']:
        return jsonify({"error": "Invalid user_type"}), 400

    # Avoid repited users
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User already exist"}), 400

    user = User(username=username, user_type=user_type, preferences=preferences)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered", "user": {"username": username, "type": user_type}}), 201

# ===============================
# Advertisement paths
# ===============================

@app.route('/create_listing', methods=['POST'])
def create_listing():
    """
    Create an advertisement of a house or room.
    """
    data = request.json
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    photos = data.get('photos', [])
    owner = data.get('owner')

    user = User.query.filter_by(username=owner).first()
    if not user or user.user_type != 'advertiser':
        return jsonify({"error": "Only advertisers can create an advertisement"}), 403

    listing = Listing(title=title, description=description, price=price, photos=photos, owner_id=user.id)
    db.session.add(listing)
    db.session.commit()

    return jsonify({"message": "Advertisement created", "listing": {"title": title, "description": description}}), 201

@app.route('/get_listings', methods=['GET'])
def get_listings():
    """
    Returns advertisements available.
    """
    listings = Listing.query.all()
    results = [{"id": l.id, "title": l.title, "description": l.description, "price": l.price, "photos": l.photos} for l in listings]
    return jsonify(results)

# ===============================
# Swipe & Match
# ===============================

@app.route('/swipe', methods=['POST'])
def swipe():
    """
    Searcher slides right/left depending if he likes the advertisement or not.
    """
    data = request.json
    listing_id = data.get('listing_id')
    direction = data.get('direction')

    if direction not in ['left', 'right']:
        return jsonify({"error": "Not valid direction"}), 400

    if direction == 'right':
        return jsonify({"message": "Potential match! Waiting advertiser..."}), 200
    else:
        return jsonify({"message": "Keep sliding"}), 200

# ===============================
# Basic chat between users that they have matched
# ===============================

@app.route('/chat', methods=['POST'])
def chat():
    """
    Allows two users to chat, only if there was a match before
    """
    data = request.json
    sender = data.get('sender')
    receiver = data.get('receiver')
    message = data.get('message')

    if not sender or not receiver or not message:
        return jsonify({"error": "Not enough data"}), 400

    return jsonify({"message": f"{sender} says to {receiver}: {message}"}), 200

# ===============================
#  Root path to check server status
# ===============================

@app.route('/', methods=['GET'])
def home():
    return "¡Servidor Flask funcionando correctamente!"

# ===============================
# Launch Flask app
# ===============================
if __name__ == '__main__':
    app.run(debug=True)
