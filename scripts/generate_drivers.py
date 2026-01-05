import json
from datetime import date, timedelta

INPUT_PATH = "mock-data/drivers.json"
OUTPUT_PATH = "mock-data/drivers.json"  # overwrite; change if you want a new file
START_DATE = date(2025, 1, 6)           # Monday
WEEKS = 3
EXCLUDE_SUNDAYS = True

# Fallback baseline if a driver has no existing days to copy from
DEFAULT_BASELINE = {
    "route": "R01",
    "avgSPM": 6.5,
    "avgNDPPH": 15.0,
    "avgMiles": 60,
    "avgStops": 90,
    "ovUn": -0.2,
    "sporh": 14.2,
    "planDay": 7.1,
    "paidDay": 7.0,
}

def iso_week_label(d: date) -> str:
    y, w, _ = d.isocalendar()
    return f"{y}-W{w:02d}"

def safe_float(x, default=0.0):
    try:
        return float(x)
    except Exception:
        return float(default)

def safe_int(x, default=0):
    try:
        return int(round(float(x)))
    except Exception:
        return int(default)

def next_route(route: str, step: int = 1) -> str:
    # Routes like "R01", "R12" -> increment number, keep 2 digits
    if not isinstance(route, str) or len(route) < 2 or not route[1:].isdigit():
        return route
    n = int(route[1:]) + step
    return f"R{n:02d}"

def make_day_record(d: date, baseline: dict, kind: str) -> dict:
    """
    kind: "weekday" (Mon-Thu), "friday", "saturday"
    Keeps ALL required fields.
    """
    record = {
        "date": d.isoformat(),
        "week": iso_week_label(d),
        "route": baseline.get("route", DEFAULT_BASELINE["route"]),
        "avgSPM": safe_float(baseline.get("avgSPM", DEFAULT_BASELINE["avgSPM"])),
        "avgNDPPH": safe_float(baseline.get("avgNDPPH", DEFAULT_BASELINE["avgNDPPH"])),
        "avgMiles": safe_int(baseline.get("avgMiles", DEFAULT_BASELINE["avgMiles"])),
        "avgStops": safe_int(baseline.get("avgStops", DEFAULT_BASELINE["avgStops"])),
        "ovUn": safe_float(baseline.get("ovUn", DEFAULT_BASELINE["ovUn"])),
        "sporh": safe_float(baseline.get("sporh", DEFAULT_BASELINE["sporh"])),
        "planDay": safe_float(baseline.get("planDay", DEFAULT_BASELINE["planDay"])),
        "paidDay": safe_float(baseline.get("paidDay", DEFAULT_BASELINE["paidDay"])),
    }

    # Weekday/weekend pattern (small, realistic nudges)
    if kind == "friday":
        record["route"] = next_route(record["route"], 1)
        record["avgStops"] = max(0, record["avgStops"] + 1)
        record["avgMiles"] = max(0, record["avgMiles"] + 1)
        record["ovUn"] = record["ovUn"] + 0.1
        record["paidDay"] = record["paidDay"] + 0.1
    elif kind == "saturday":
        record["route"] = next_route(record["route"], 2)
        record["avgStops"] = max(0, record["avgStops"] - 2)
        record["avgMiles"] = max(0, record["avgMiles"] + 2)
        record["avgSPM"] = record["avgSPM"] + 0.2
        record["sporh"] = record["sporh"] + 0.2
        record["planDay"] = record["planDay"] - 0.1
        record["paidDay"] = record["paidDay"] - 0.1

    # keep decimals tidy
    for k in ["avgSPM", "avgNDPPH", "ovUn", "sporh", "planDay", "paidDay"]:
        record[k] = round(float(record[k]), 1)

    return record

def build_3_week_schedule(start: date) -> list[date]:
    days = []
    total_days = WEEKS * 7
    for i in range(total_days):
        d = start + timedelta(days=i)
        if EXCLUDE_SUNDAYS and d.weekday() == 6:  # Sunday = 6
            continue
        days.append(d)
    return days

def main():
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        drivers = json.load(f)

    schedule_days = build_3_week_schedule(START_DATE)

    for driver in drivers:
        # Choose baseline from driver's first existing day if possible
        first_day = None
        if isinstance(driver.get("days"), list) and driver["days"]:
            first_day = driver["days"][0]

        baseline = DEFAULT_BASELINE.copy()
        if isinstance(first_day, dict):
            # Pull only the fields we need, but DO NOT remove any required fields later
            for k in DEFAULT_BASELINE.keys():
                if k in first_day:
                    baseline[k] = first_day[k]

        # Prefer weekday route = primaryRoute when it looks like "R##"
        pr = driver.get("primaryRoute")
        if isinstance(pr, str) and pr.startswith("R") and pr[1:].isdigit():
            baseline["route"] = pr

        new_days = []
        for d in schedule_days:
            wd = d.weekday()  # Mon=0 ... Sun=6
            if wd <= 3:       # Mon–Thu
                kind = "weekday"
            elif wd == 4:     # Fri
                kind = "friday"
            else:             # Sat (since Sunday excluded)
                kind = "saturday"

            new_days.append(make_day_record(d, baseline, kind))

        driver["days"] = new_days  # overwrite with the new pattern

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(drivers, f, indent=2)

    print(f"Updated {len(drivers)} drivers -> {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
