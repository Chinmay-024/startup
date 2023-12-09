import json
from datetime import datetime

def convert_amount(amount_str):
    if amount_str.strip():
        return int(amount_str.replace(',', ''))
    else:
        return None

def convert_date_format(date_str):
    try:
        # Try the original format '%d/%m/%Y'
        date_object = datetime.strptime(date_str, '%d/%m/%Y')
    except ValueError:
        try:
            # If the original format fails, try an alternative format '%d.%m.%Y'
            date_object = datetime.strptime(date_str, '%d.%m.%Y')
        except ValueError:
            # If both formats fail, you may want to handle it accordingly
            return None
    
    return date_object.strftime('%m/%d/%Y')

with open('data.json', 'r') as file:
    data_array = json.load(file)

converted_data_array = []

for data in data_array:
    converted_data = {
        "date": convert_date_format(data["date"]),
        "name": data["name"],
        "vertical": data["vertical"],
        "sub_vertical": data["sub_vertical"],
        "city_location": data["city_location"],
        "investors_name": [investor.strip() for investor in data["investors_name"].split(',')],
        "investment_type": data["investment_type"],
        "amount": convert_amount(data["amount"]),
        "remarks": data["remarks"]
    }
    converted_data_array.append(converted_data)

# Convert to JSON
json_data = json.dumps(converted_data_array, indent=2)

# Write to startup.json
with open('startup.json', 'w') as output_file:
    output_file.write(json_data)

print("Data written to startup.json")
