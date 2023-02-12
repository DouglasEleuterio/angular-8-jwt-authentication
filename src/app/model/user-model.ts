import {BaseModel} from './base-model';
import {AuthoritiesModel} from './authorities-model';

export class UserModel extends BaseModel {

  constructor(username: string, firstname: string, lastname: string, email: string, activated: boolean, authorities: AuthoritiesModel[]) {
    super();
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.activated = activated;
    this.authorities = authorities;
  }

  username: string;
  firstname: string;
  lastname: string;
  email: string;
  activated: boolean;
  authorities: AuthoritiesModel[];
}
