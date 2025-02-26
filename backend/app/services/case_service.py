from typing import List
from uuid import UUID
from models.user_model import User
from models.case_model import Case
from schemas.case_schema import CaseCreate, CaseUpdate, CaseSymptoms,CaseAnalyses
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
    async def update_analyses(current_user: User, case_id: UUID, data: CaseAnalyses):
        case = await CaseService.retrieve_case(current_user, case_id)
        await case.update({"$set": data.dict(exclude_unset=True)})
        
        await case.save()
        return case


    @staticmethod
    async def get_diagnostic(current_user: User, case_id: UUID):
        
        case = await CaseService.retrieve_case(current_user, case_id)
      
        symptoms = case.symptoms.items()

        es=ExpertSystem(str(case_id))

        for key, value in symptoms:
            es.add_symptom(key, value)
        es.run()
        
        data=es.get_diag()

        await case.update({"$set": data})
        
        await case.save()
        return case

          

    @staticmethod
    async def get_treatment(current_user: User, case_id: UUID):
        
        case = await CaseService.retrieve_case(current_user, case_id)
      
        symptoms = case.symptoms.items()

        es=ExpertSystem(str(case_id))

        for key, value in symptoms:
            es.add_symptom(key, value)
        es.run()
        
        data=es.get_treat()

        await case.update({"$set": data})
        
        await case.save()
        return case


             

    @staticmethod
    async def get_suggestion(current_user: User, case_id: UUID):
        
        case = await CaseService.retrieve_case(current_user, case_id)
      
        symptoms = case.symptoms.items()

        es=ExpertSystem(str(case_id))

        for key, value in symptoms:
            es.add_symptom(key, value)
        es.run()
        
        data=es.get_sugg()

        await case.update({"$set": data})
        
        await case.save()
        return case

          