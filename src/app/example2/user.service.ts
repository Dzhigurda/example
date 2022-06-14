import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState, User, UserAvatarFormDTO, UserDTO, UserFormDTO, UserRoleFormDTO } from './business';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private store: Store<AppState>) { }


  add(user: UserFormDTO) {
    return this.http.put<UserDTO>(`${environment.host}/api/users`, user);
  }


  getAll() {
    return this.http.get<UserDTO[]>(`${environment.host}/api/users`).pipe(
      map(r => {
        return r.map(u => new User().restore(u));
      })
    )
  }

  edit(user: UserDTO | UserRoleFormDTO | UserFormDTO | UserAvatarFormDTO) {
    return this.http.patch<UserDTO>(`${environment.host}/api/users/${user.id}`, user).pipe(
      map(u => new User().restore(u))
    );
  }


  clearAvatar(id: number) {
    return this.http.delete<boolean>(`${environment.host}/api/users/${id}/avatar`, {});
  }

  remove(id: number) {
    return this.http.delete<boolean>(`${environment.host}/api/users/${id}`)
  }
}
