from fastapi import APIRouter, HTTPException, status
from schemas.user_schema import  UserOut, UserUpdate, UserActivateDeactivate
from fastapi import Depends
from services.user_service import UserService
import pymongo
from uuid import UUID
from models.user_model import User
from api.deps.user_deps import get_current_user
from typing import List


admin_router = APIRouter()


@admin_router.get('/get_all_user', summary='Get all User', response_model=List[User])
async def get_all_users( current_user: User = Depends(get_current_user)):
    
    if(current_user.role!="Admin"):
        raise HTTPException(status_code=403, detail="You are not allowed to access this resource")
    
    users= await User.find_all().to_list()
    return users


@admin_router.post('/activate_deactivate_user/{user_id}', summary='Update User', response_model=UserOut)
async def update_user(user_id: UUID ,data: UserActivateDeactivate, current_user: User = Depends(get_current_user)):
    if(current_user.role!="Admin"):
        raise HTTPException(status_code=403, detail="You are not allowed to access this resource")
    
    try:
        return await UserService.update_user(user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User does not exist"
        )
        
        
@admin_router.delete('/delete_user/{user_id}', summary='Update User', response_model=UserOut)
async def update_user(user_id: UUID ,data: UserActivateDeactivate, current_user: User = Depends(get_current_user)):
    if(current_user.role!="Admin"):
        raise HTTPException(status_code=403, detail="You are not allowed to access this resource")
    
    try:
        return await UserService.update_user(user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User does not exist"
        )