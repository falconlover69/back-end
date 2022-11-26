import { UseGuards } from "@nestjs/common/decorators/core";
import { AuthGuard } from "@nestjs/passport";

export const Auth = () => UseGuards(AuthGuard('jwt'))