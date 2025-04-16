from fastapi import APIRouter, HTTPException, status
from schemas.user_schema import  UserOut, UserUpdate
from fastapi import Depends
from services.user_service import UserService
import pymongo
from models.user_model import User
from api.deps.user_deps import get_current_user
from typing import List


admin_router = APIRouter()


@admin_router.get('/get_all_user', summary='Get all User', response_model=List[UserOut])
async def get_all_users( current_user: User = Depends(get_current_user)):
    users=UserService.get_all_user(current_user)
    return users