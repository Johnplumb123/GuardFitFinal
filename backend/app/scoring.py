def calculate_score(app):
    score = 100
    reasons = []
    deductions = []

    def apply_deduction(condition, points, title, description, example):
        nonlocal score
        if condition:
            score -= points
            reasons.append(description)
            deductions.append(
                {
                    "factor": title,
                    "points": points,
                    "description": description,
                    "example": example,
                }
            )

    apply_deduction(
        app["health_data"],
        10,
        "Health Data",
        "Handles personal fitness or health data",
        "Example: Stores workouts, heart rate, calorie data",
    )

    apply_deduction(
        app["sensitive_info"],
        12,
        "Sensitive Information",
        "Processes highly sensitive personal data",
        "Example: Health conditions or biometric insights",
    )

    apply_deduction(
        app["location_data"],
        10,
        "Location Data",
        "Tracks user location",
        "Example: GPS routes during runs or workouts",
    )

    apply_deduction(
        app["tracking"],
        15,
        "Cross-Service Tracking",
        "Tracks users across platforms",
        "Example: Shares data with third-party advertisers",
    )

    apply_deduction(
        app["identifiers"],
        8,
        "Identifiers",
        "Uses personal identifiers",
        "Example: User ID, email, or device ID tracking",
    )

    apply_deduction(
        app["contact_info"],
        8,
        "Contact Information",
        "Collects personal contact details",
        "Example: Email or phone number required",
    )

    apply_deduction(
        app["contacts"],
        10,
        "Contacts Access",
        "Accesses user contacts",
        "Example: Syncing friends from contact list",
    )

    apply_deduction(
        app["usage_data"],
        8,
        "Usage Data",
        "Tracks user behaviour",
        "Example: Monitoring app activity or engagement",
    )

    apply_deduction(
        app["user_content"],
        5,
        "User Content",
        "Stores user-generated content",
        "Example: Posts, workout logs, shared activity",
    )

    apply_deduction(
        app["diagnostics"],
        4,
        "Diagnostics",
        "Collects device diagnostic data",
        "Example: Crash reports and performance metrics",
    )

    score = max(score, 0)

    if score >= 80:
        risk = "Low Risk"
    elif score >= 50:
        risk = "Moderate Risk"
    else:
        risk = "High Risk"

    return {
        "privacy_score": score,
        "risk_level": risk,
        "reasons": reasons,
        "deductions": deductions,
        "summary": (
            "Higher scores indicate stronger privacy protection and lower data exposure. "
            "Lower scores indicate increased privacy risk due to broader collection, "
            "tracking, or linkage practices."
        ),
    }