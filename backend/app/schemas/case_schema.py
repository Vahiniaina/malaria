from datetime import datetime
from typing import Optional, Any, Dict
from uuid import UUID
from pydantic import BaseModel, Field

class CaseCreate(BaseModel):
    title: str = Field(..., title='Title', max_length=55, min_length=1)
    description: str = Field(..., title='Title', max_length=755, min_length=1)
    patient_name: str
    status: Optional[bool] = False
    created_at: datetime
    
    
class CaseUpdate(BaseModel):
    title: Optional[str] = Field(..., title='Title', max_length=55, min_length=1)
    description: Optional[str] = Field(..., title='Title', max_length=755, min_length=1)
    patient_name: str
    status: Optional[bool] = False
    updated_at: datetime
    

class CaseOut(BaseModel):
    case_id: UUID
    title: str
    description: str
    symptoms: Dict[str, Any]
    analyses: Dict[str, Any]
    treatment: Dict[str, Any]   
    diagnostic: Dict[str, Any]
    patient_details: Dict[str, Any]
    patient_name: str
    status: bool
    created_at: datetime
    updated_at: datetime

# new
class CaseSymptoms(BaseModel):
    symptoms:  Dict[str, Any]
    updated_at: datetime

    
class CaseAnalyses(BaseModel):
    analyses: Dict[str, Any]
    updated_at: datetime
    

class CaseDiagnostic(BaseModel):
    diagnostic: Dict[str, Any]
    updated_at: datetime
    

class CaseTreatment(BaseModel):
    treatment: Dict[str, Any]
    updated_at: datetime
    
    
    
class CasePatientDetails(BaseModel):
    patient_details: Dict[str, Any]
    updated_at: datetime
    
class CaseToKnowledgeBase(BaseModel):
    # symptoms: Dict[str, Any]
    # traitement: Dict[str, Any]
    diagnostic: Dict[str, Any]
    