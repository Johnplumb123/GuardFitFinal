from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import FitnessApp
from app.scoring import calculate_score

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/compare")
def compare_apps(db: Session = Depends(get_db)):
    apps = db.query(FitnessApp).all()
    results = []

    for app in apps:
        app_dict = {
            "name": app.name,
            "health_data": app.health_data,
            "sensitive_info": app.sensitive_info,
            "location_data": app.location_data,
            "tracking": app.tracking,
            "identifiers": app.identifiers,
            "contact_info": app.contact_info,
            "contacts": app.contacts,
            "usage_data": app.usage_data,
            "user_content": app.user_content,
            "diagnostics": app.diagnostics,
        }

        result = calculate_score(app_dict)

        results.append(
            {
                "app_name": app.name,
                "privacy_score": result["privacy_score"],
                "risk_level": result["risk_level"],
                "reasons": result["reasons"],
                "deductions": result["deductions"],
                "summary": result["summary"],
            }
        )

    results = sorted(results, key=lambda x: x["privacy_score"], reverse=True)

    for index, app in enumerate(results, start=1):
        app["rank"] = index

    return results