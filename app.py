from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/linear-regression', methods=['POST'])
def linear_regression():
    data = request.json
    x = np.array(data['x'], dtype=float)
    y = np.array(data['y'], dtype=float)

    if len(x) != len(y):
        return jsonify({'error': 'Input arrays must have the same length'}), 400

    # Compute sums
    n = len(x)
    sum_x = np.sum(x)
    sum_y = np.sum(y)
    sum_xy = np.sum(x * y)
    sum_x2 = np.sum(x ** 2)

    # Compute slope (m) and intercept (c) using the formula
    m = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x**2)
    c = (sum_y - m * sum_x) / n

    return jsonify({'slope': round(m, 4), 'intercept': round(c, 4)})

if __name__ == '__main__':
    app.run(debug=True)
