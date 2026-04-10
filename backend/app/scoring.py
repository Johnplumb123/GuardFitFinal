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
        "Handles personal fitness or health data.",
        "Stores metrics such as workouts, calories, heart rate, or activity history.",
    )

    apply_deduction(
        app["sensitive_info"],
        10,
        "Sensitive Information",
        "Processes more sensitive personal or wellness-related information.",
        "Could include biometric insights, detailed wellness records, or other sensitive health-related attributes.",
    )

    apply_deduction(
        app["location_data"],
        15,
        "Location Data",
        "Uses or stores location information.",
        "Tracks GPS routes, running paths, or location-based workout activity.",
    )

    apply_deduction(
        app["tracking"],
        25,
        "Cross-Service Tracking",
        "Tracks users across services or supports broader profiling.",
        "May support advertising, cross-platform analytics, or broader user tracking.",
    )

    apply_deduction(
        app["identifiers"],
        5,
        "Identifiers",
        "Uses identifying account or device-linked information.",
        "Such as user IDs, email-linked accounts, or device identifiers.",
    )

    apply_deduction(
        app["contact_info"],
        5,
        "Contact Information",
        "Collects personal contact details.",
        "Such as email address, profile details, or phone-related account information.",
    )

    apply_deduction(
        app["contacts"],
        15,
        "Contacts Access",
        "Accesses or links to the user’s contacts.",
        "For example, syncing contacts or finding friends through address book data.",
    )

    apply_deduction(
        app["usage_data"],
        5,
        "Usage Data",
        "Collects behavioural or interaction data.",
        "Tracks how users interact with the app, features used, or engagement activity.",
    )

    apply_deduction(
        app["user_content"],
        5,
        "User Content",
        "Stores user-generated content or submitted activity data.",
        "Includes logs, posts, progress entries, shared workout content, or manually added records.",
    )

    apply_deduction(
        app["diagnostics"],
        5,
        "Diagnostics",
        "Collects technical diagnostic or crash-related data.",
        "Includes performance logging, crash reporting, or troubleshooting telemetry.",
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
            "Higher scores indicate stronger privacy protection and fewer data exposure risks. "
            "Lower scores reflect broader collection, tracking, or linkage practices."
        ),
    }