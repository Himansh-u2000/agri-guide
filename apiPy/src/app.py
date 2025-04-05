from flask import Flask, jsonify, request
from flask_cors import CORS  # Allow React to fetch data
from services.recommendCrops import predictCrop  # Import the recommend function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/top-ten-crops', methods=['GET'])
def get_crops():
    try:
        # Get query parameters from the request
        N = float(request.args.get('N', 0))
        P = float(request.args.get('P', 0))
        K = float(request.args.get('K', 0))
        temp = float(request.args.get('temp', 0))
        humidity = float(request.args.get('humidity', 0))
        pH = float(request.args.get('pH', 0))
        rainfall = float(request.args.get('rainfall', 0))

        # Call the prediction function with the parameters
        recommendations = predictCrop(N, P, K, temp, humidity, pH, rainfall)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": f"Error in finding recommended crops: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True)
