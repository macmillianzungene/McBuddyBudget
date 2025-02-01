from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False   
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a strong secret key

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Initialize Database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)       
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)       
    category = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)       
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], password=hashed_password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)      

    return jsonify({"message": "Invalid credentials"}), 401

# Get Expenses (Protected)
@app.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    return jsonify([{"id": e.id, "category": e.category, "amount": e.amount} for e in expenses])

# Add Expense (Protected)
@app.route('/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    data = request.json
    user_id = get_jwt_identity()

    new_expense = Expense(category=data['category'], amount=data['amount'], user_id=user_id)
    db.session.add(new_expense)
    db.session.commit()

    return jsonify({"message": "Expense added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)

