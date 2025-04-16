from fastapi import APIRouter
from api.api_v1.handlers import user
from api.api_v1.handlers import case
from api.api_v1.handlers import admin
from api.auth.jwt import auth_router

router = APIRouter()

router.include_router(auth_router, prefix='/auth', tags=["auth"])
router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(case.case_router, prefix='/case', tags=["case"])
router.include_router(admin.admin_router, prefix='/admin', tags=["admin"])