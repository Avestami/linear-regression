from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/linear-regression', methods=['POST'])
def linear_regression():
    data = request.json
    x = np.array(data['x'])
    y = np.array(data['y'])

    if len(x) != len(y):
        return jsonify({'error': 'Input arrays must have the same length'}), 400

    # Compute linear least squares
    A = np.vstack([x, np.ones(len(x))]).T
    m, c = np.linalg.lstsq(A, y, rcond=None)[0]

    return jsonify({'slope': m, 'intercept': c})

if __name__ == '__main__':
    app.run(debug=True)
