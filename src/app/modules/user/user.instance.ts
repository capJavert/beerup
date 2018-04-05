'use strict';
import {User} from "./user";
import {Session} from "./session";
import {RoleEnum} from "./role.enum";

const user =  new User();
user.session = new Session("TOKEN", RoleEnum.User);

export const UserInstance = user;
