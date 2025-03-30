from typing import List
from uuid import UUID
from models.user_model import User
from fastapi import HTTPException
from models.case_model import Case
from schemas.case_schema import CaseCreate, CasePatientDetails, CaseUpdate, CaseSymptoms,CaseAnalyses, CaseToKnowledgeBase
from services.es_service import ExpertSystem

class CaseService:
    @staticmethod
    async def list_cases(user: User) -> List[Case]:
        cases = await Case.find(Case.owner.id == user.id).sort(-Case.created_at).to_list()
        return cases
    
    @staticmethod
    async def create_case(user: User, data: CaseCreate) -> Case:    
        case = Case(**data.dict(), owner=user)
        return await case.insert()
    
    @staticmethod
    async def retrieve_case(current_user: User, case_id: UUID):
        case = await Case.find_one(Case.case_id == case_id, Case.owner.id == current_user.id)
        return case
    
    @staticmethod
    async def update_case(current_user: User, case_id: UUID, data: CaseUpdate):
        case = await CaseService.retrieve_case(current_user, case_id)
        await case.update({"$set": data.dict(exclude_unset=True)})
        
        await case.save()
        return case

        
    
    @staticmethod
    async def delete_case(current_user: User, case_id: UUID) -> None:
        case = await CaseService.retrieve_case(current_user, case_id)
        if case:
            await case.delete()
            
        return None
    


    @staticmethod
    async def update_symptoms(current_user: User, case_id: UUID, data: CaseSymptoms):
        case = await CaseService.retrieve_case(current_user, case_id)
        await case.update({"$set": data.dict(exclude_unset=True)})
        
        await case.save()
        return case


    @staticmethod
    async def update_patient_details(current_user: User, case_id: UUID, data: CasePatientDetails):
        case = await CaseService.retrieve_case(current_user, case_id)
        await case.update({"$set": data.dict(exclude_unset=True)})
        
        await case.save()
        return case


    @staticmethod
    async def update_analyses(current_user: User, case_id: UUID, data: CaseAnalyses):
        case = await CaseService.retrieve_case(current_user, case_id)
        await case.update({"$set": data.dict(exclude_unset=True)})
        
        await case.save()
        return case


    @staticmethod
    async def get_diagnostic(current_user: User, case_id: UUID):
        
        case = await CaseService.retrieve_case(current_user, case_id)
      
        symptoms = case.symptoms.items()
        analyses = case.analyses.items()
        patient_details = case.patient_details.items()

        es=ExpertSystem(str(case_id))

        all_data = list(symptoms) + list(analyses) + list(patient_details)

        for key, value in all_data:
            es.add_symptom(key, value)
        es.run()
        
        data=es.get_diag()

        await case.update({"$set": data})
        
        await case.save()
        return case

          

    @staticmethod
    async def get_treatment(current_user: User, case_id: UUID):
        
        if(current_user.role=="simple"):
            raise HTTPException(status_code=403, detail="You are not allowed to access this resource")

        case = await CaseService.retrieve_case(current_user, case_id)
      
              
        symptoms = case.symptoms.items()
        analyses = case.analyses.items()
        patient_details = case.patient_details.items()

        es=ExpertSystem(str(case_id))

        all_data = list(symptoms) + list(analyses) + list(patient_details)

        for key, value in all_data:
            es.add_symptom(key, value)
        es.run()
        
        data=es.get_treat()

        await case.update({"$set": data})
        
        await case.save()
        return case

          

    @staticmethod
    async def add_case_to_knowledge_base(data:CaseToKnowledgeBase, case_id: UUID, current_user: User):
        
        if(current_user.role=="simple"):
            raise HTTPException(status_code=403, detail="You are not allowed to access this resource")

        case = await CaseService.retrieve_case(current_user, case_id)
        
        ExpertSystem.create_clp_rule(case, data)

        # case = CaseService.get_diagnostic(current_user, case_id)
        
        # case = CaseService.get_treatment(current_user, case_id)
        
        return case