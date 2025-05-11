from flask import Blueprint, request, jsonify
import requests
import spacy

# Load spaCy's English model
nlp = spacy.load("en_core_web_sm")

# Define the Blueprint
price_bp = Blueprint('price_bp', __name__)

@price_bp.route('/get_price', methods=['GET', 'POST'])
def get_price():
    try:
        # Extract query based on method
        if request.method == 'POST':
            query = request.json.get('question')
        else:
            query = request.args.get('query')

        # Use NLP to extract commodity, state, and city
        commodity, state, city = extract_info(query)

        if not commodity or not state or not city:
            return jsonify({
                "error": "Unable to extract required details from the query. Please specify commodity, state, and city."
            }), 400

        # Replace with actual API URL if available
        api_url = f'https://agmarknet.gov.in/api/get_price?commodity={commodity}&state={state}&market={city}'

        # For now, use a dummy response or internal logic
        # api_url = f'http://127.0.0.1:5000/fake_agmarknet?commodity={commodity}&state={state}&market={city}'

        response = requests.get(api_url)

        if response.status_code != 200:
            return jsonify({
                "error": f"Failed to fetch data from Agmarknet (Status: {response.status_code})"
            }), 502

        data = response.json()
        return jsonify({'answer': data})  # Wrap with 'answer' for consistency

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Server error", "details": str(e)}), 500


def extract_info(query):
    states = ['Karnataka', 'Delhi', 'Tamil Nadu', 'Maharashtra', 'Uttar Pradesh']
    cities = ['Bangalore', 'Delhi', 'Chennai', 'Mumbai', 'Lucknow']
    commodities = ['Potato', 'Tomato', 'Onion', 'Rice', 'Wheat']

    state = None
    city = None
    commodity = None

    query_lower = query.lower()
    doc = nlp(query)

    # Case-insensitive city/state detection
    for s in states:
        if s.lower() in query_lower:
            state = s
            break

    for c in cities:
        if c.lower() in query_lower:
            city = c
            break

    for item in commodities:
        if item.lower() in query_lower:
            commodity = item
            break

    return commodity, state, city
