from flask import Flask, jsonify, request
from flask_cors import CORS  # Allow React to fetch data
from getPopularBooks import recommend  # Import the recommend function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/books/<name>', methods=['GET'])
def get_books(name):
    # Handle cases where the book name might not exist in the dataset
    try:
        recommendations = recommend(name)
        return jsonify(recommendations)
    except IndexError:
        return jsonify({"error": "Book not found or insufficient data for recommendations"}), 404

if __name__ == '__main__':
    app.run(debug=True)
