from typing import Optional
from uuid import UUID
from schemas.user_schema import UserAuth
from models.user_model import User
from core.security import get_password, verify_password
import pymongo
from fastapi import HTTPException
from typing import List

from schemas.user_schema import UserUpdate


class UserService:
    @staticmethod
    async def create_user(user: UserAuth):
        user_in = User(
            username=user.username,
            email=user.email,
            hashed_password=get_password(user.password),
            role=user.role,
            code=user.code
        )
        await user_in.save()
        return user_in
    
    @staticmethod
    async def authenticate(email: str, password: str) -> Optional[User]:
        user = await UserService.get_user_by_email(email=email)
        if not user:
            return None
        if not verify_password(password=password, hashed_pass=user.hashed_password):
            return None
        
        return user
    
    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        user = await User.find_one(User.email == email)
        return user
    
    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[User]:
        user = await User.find_one(User.user_id == id)
        return user
    
    @staticmethod
    async def update_user(id: UUID, data: UserUpdate) -> User:
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
    
        await user.update({"$set": data.dict(exclude_unset=True)})
        return user
        
    @staticmethod
    async def get_all_user(current_user) -> List[User]:
        
        if(current_user.role!="Admin"):
            raise HTTPException(status_code=403, detail="You are not allowed to access this resource")
      
        users= await User.find_all().to_list()  
         
        return users