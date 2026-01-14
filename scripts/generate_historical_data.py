import json
import random
from datetime import datetime, timedelta

# Configuration for your mock-up
drivers = ["Alex P.", "Jordan M.", "Sam R.", "Taylor B."]
routes = ["North-Loop", "Downtown-Exp", "West-Side", "Industrial-V1"]
days_to_generate = 30

historical_data = []

start_date = datetime.now() - timedelta(days=days_to_generate)

for i in range(days_to_generate + 1):
    current_date = start_date + timedelta(days=i)
    day_of_week = current_date.strftime("%A")
    
    for driver in drivers:
        for route in routes:
            # Add some "logic" so trends look real
            base_eff = 0.85
            if day_of_week == "Friday": base_eff -= 0.1  # Fridays are slower
            if route == "Downtown-Exp": base_eff -= 0.05 # Traffic heavy route
            
            efficiency = round(min(0.99, max(0.6, base_eff + random.uniform(-0.1, 0.1))), 2)
            
            historical_data.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "dayOfWeek": day_of_week,
                "driverName": driver,
                "routeId": route,
                "stats": {
                    "efficiency": efficiency,
                    "completedStops": random.randint(20, 45),
                    "delayMinutes": random.randint(0, 60) if efficiency < 0.8 else 0
                }
            })

# Save it where Angular can see it
with open('../src/assets/mock-data/historical-stats.json', 'w') as f:
    json.dump(historical_data, f, indent=2)

print(f"Generated {len(historical_data)} data points in assets folder.")
