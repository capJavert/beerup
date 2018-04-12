'use strict';
import {User} from "./user";
import {Session} from "./session";
import {RoleEnum} from "./role.enum";
import * as firebase from "firebase";
import {FirebaseConfig} from "../service/firebase.config";

firebase.initializeApp(FirebaseConfig);
const user =  new User();
user.session = new Session("TOKEN", RoleEnum.User);

export const UserInstance = user;
