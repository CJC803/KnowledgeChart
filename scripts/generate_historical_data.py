import json
import random
from datetime import datetime, timedelta

# Configuration based on your current drivers.json
driver_configs = [
    {"id": "D001", "first": "Marcus", "last": "Hill", "route": "R01"},
    {"id": "D002", "first": "Anthony", "last": "Reed", "route": "R02"},
    {"id": "D003", "first": "Derrick", "last": "Johnson", "route": "R03"}
]

days_to_generate = 30
historical_stats = []

# Generate data starting from Jan 6th to match your current logs
start_date = datetime(2025, 1, 6)

for config in driver_configs:
    driver_entry = {
        "driverId": config["id"],
        "firstName": config["first"],
        "lastName": config["last"],
        "primaryRoute": config["route"],
        "days": []
    }
    
    for i in range(days_to_generate):
        current_date = start_date + timedelta(days=i)
        
        # Skip Sundays if you want a realistic work week
        if current_date.weekday() == 6: continue
        
        stats = {
            "date": current_date.strftime("%Y-%m-%d"),
            "week": current_date.strftime("%G-W%V"),
            "route": config["route"],
            "avgSPM": round(random.uniform(6.0, 7.5), 1),
            "avgNDPPH": round(random.uniform(14.0, 16.5), 1),
            "avgMiles": random.randint(55, 75),
            "avgStops": random.randint(85, 110),
            "ovUn": round(random.uniform(-0.5, 0.5), 1),
            "sporh": round(random.uniform(13.5, 15.5), 1),
            "planDay": round(random.uniform(7.0, 7.5), 1),
            "paidDay": round(random.uniform(7.0, 7.8), 1)
        }
        driver_entry["days"].append(stats)
    
    historical_stats.append(driver_entry)

# Save to your assets folder
with open('../src/assets/mock-data/historical-stats.json', 'w') as f:
    json.dump(historical_stats, f, indent=2)

print("Historical data successfully generated with matched schema.")
