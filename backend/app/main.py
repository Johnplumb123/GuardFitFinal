from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, SessionLocal
from app.models import FitnessApp
from app.routes import app_analysis

app = FastAPI(title="GuardFit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def seed_database():
    db = SessionLocal()
    try:
        existing_names = {app.name for app in db.query(FitnessApp).all()}

        apps = [
            FitnessApp(
                name="Apple Health",
                health_data=True,
                sensitive_info=False,
                location_data=False,
                tracking=False,
                identifiers=True,
                contact_info=False,
                contacts=False,
                usage_data=False,
                user_content=False,
                diagnostics=True,
            ),
            FitnessApp(
                name="Nike Training Club",
                health_data=True,
                sensitive_info=False,
                location_data=False,
                tracking=False,
                identifiers=True,
                contact_info=False,
                contacts=False,
                usage_data=True,
                user_content=True,
                diagnostics=True,
            ),
            FitnessApp(
                name="MyFitnessPal",
                health_data=True,
                sensitive_info=True,
                location_data=False,
                tracking=True,
                identifiers=True,
                contact_info=True,
                contacts=False,
                usage_data=True,
                user_content=True,
                diagnostics=True,
            ),
            FitnessApp(
                name="Google Fit",
                health_data=True,
                sensitive_info=False,
                location_data=True,
                tracking=True,
                identifiers=True,
                contact_info=True,
                contacts=False,
                usage_data=True,
                user_content=False,
                diagnostics=True,
            ),
            FitnessApp(
                name="Strava",
                health_data=True,
                sensitive_info=False,
                location_data=True,
                tracking=True,
                identifiers=True,
                contact_info=False,
                contacts=True,
                usage_data=True,
                user_content=True,
                diagnostics=True,
            ),
            FitnessApp(
                name="ASICS Runkeeper",
                health_data=True,
                sensitive_info=True,
                location_data=True,
                tracking=True,
                identifiers=True,
                contact_info=True,
                contacts=False,
                usage_data=True,
                user_content=True,
                diagnostics=True,
            ),
            FitnessApp(
                name="Fitbit",
                health_data=True,
                sensitive_info=True,
                location_data=True,
                tracking=True,
                identifiers=True,
                contact_info=True,
                contacts=True,
                usage_data=True,
                user_content=True,
                diagnostics=True,
            ),
        ]

        new_apps = [app for app in apps if app.name not in existing_names]

        if new_apps:
            db.add_all(new_apps)
            db.commit()
    finally:
        db.close()


Base.metadata.create_all(bind=engine)
seed_database()

app.include_router(app_analysis.router)


@app.get("/")
def root():
    return {"message": "GuardFit API running"}