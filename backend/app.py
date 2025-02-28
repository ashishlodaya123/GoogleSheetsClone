from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import spreadsheet
import json
import os

# Set the static folder to the "frontend" directory
app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)

DATA_FILE = "spreadsheet_data.json"

# Serve the frontend files
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files (CSS, JS)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Backend API routes
@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        operation = data.get('operation')
        range_cells = data.get('range', [])
        
        if not operation or not range_cells:
            return jsonify({'error': 'Invalid data'}), 400
        
        result = spreadsheet.perform_operation(operation, range_cells)
        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/save', methods=['POST'])
def save_data():
    try:
        data = request.json.get('spreadsheet_data')
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f)
        return jsonify({'message': 'Data saved successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/load', methods=['GET'])
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
        return jsonify({'spreadsheet_data': data})
    return jsonify({'spreadsheet_data': []})

if __name__ == '__main__':
    app.run(debug=True)