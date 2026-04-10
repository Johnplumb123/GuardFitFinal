from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class FitnessApp(Base):
    __tablename__ = "fitness_apps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    health_data = Column(Boolean, default=False)
    sensitive_info = Column(Boolean, default=False)
    location_data = Column(Boolean, default=False)
    tracking = Column(Boolean, default=False)
    identifiers = Column(Boolean, default=False)
    contact_info = Column(Boolean, default=False)
    contacts = Column(Boolean, default=False)
    usage_data = Column(Boolean, default=False)
    user_content = Column(Boolean, default=False)
    diagnostics = Column(Boolean, default=False)