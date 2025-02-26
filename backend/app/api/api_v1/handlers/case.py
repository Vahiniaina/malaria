from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from models.user_model import User
from api.deps.user_deps import get_current_user
from schemas.case_schema import CaseOut, CaseCreate, CaseUpdate, CaseSymptoms, CaseAnalyses, CaseDiagnostic, CaseSuggestion, CaseTreatment
from services.case_service import CaseService
from models.case_model import Case


case_router = APIRouter()

@case_router.get('/', summary="Get all cases of the user", response_model=List[CaseOut])
async def list(current_user: User = Depends(get_current_user)):
    return await CaseService.list_cases(current_user)


@case_router.post('/create', summary="Create Case", response_model=Case)
async def create_case(data: CaseCreate, current_user: User = Depends(get_current_user)):
    return await CaseService.create_case(current_user, data)


@case_router.get('/{case_id}', summary="Get a case by case_id", response_model=CaseOut)
async def retrieve(case_id: UUID, current_user: User = Depends(get_current_user)):
    return await CaseService.retrieve_case(current_user, case_id)


@case_router.delete('/{case_id}', summary="Delete case by case_id")
async def delete(case_id: UUID, current_user: User = Depends(get_current_user)):
    await CaseService.delete_case(current_user, case_id)
    return None


@case_router.put('/{case_id}', summary="Update case by case_id (specificaly the patient detail)", response_model=CaseOut)
async def update(case_id: UUID, data: CaseUpdate, current_user: User = Depends(get_current_user)):
    return await CaseService.update_case(current_user, case_id, data)


# vaovao

@case_router.put('/update_symptoms/{case_id}', summary="update symptoms", response_model=CaseOut)
async def update(case_id: UUID, data: CaseSymptoms, current_user: User = Depends(get_current_user)):
    return await CaseService.update_symptoms(current_user, case_id, data)



@case_router.put('/update_analyses/{case_id}', summary="update analyses", response_model=CaseOut)
async def update(case_id: UUID, data: CaseAnalyses, current_user: User = Depends(get_current_user)):
    return await CaseService.update_analyses(current_user, case_id, data)



@case_router.get('/get_diagnostic/{case_id}', summary="Get diagnostic", response_model=CaseOut)
async def update(case_id: UUID, current_user: User = Depends(get_current_user)):
    return await CaseService.get_diagnostic(current_user, case_id)




@case_router.get('/get_treatment/{case_id}', summary="get treatment", response_model=CaseOut)
async def update(case_id: UUID,  current_user: User = Depends(get_current_user)):
    return await CaseService.get_treatment(current_user, case_id)




@case_router.get('/get_suggestion/{case_id}', summary="get suggestion", response_model=CaseOut)
async def update(case_id: UUID,  current_user: User = Depends(get_current_user)):
    return await CaseService.get_suggestion(current_user, case_id)