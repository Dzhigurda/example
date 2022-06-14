import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddUser, AppState, ClearUserAvatar, RemoveUser, User, UserAvatarFormDTO, UserDTO, UserFormDTO, UserRoleFormDTO } from './business';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private store: Store<AppState>) { }


  put(user: UserFormDTO) {
    return this.http.put<UserDTO>(`${environment.host}/api/users`, user)
      .pipe(
        tap({
          next: (user) => {
            this.store.dispatch(new AddUser(user))
          }
        })
      )
  }

  
  getAll() {
    return this.http.get<UserDTO[]>(`${environment.host}/api/users`).pipe(
      map(r => {
        return r.map(u => new User().restore(u));
      })
    )
  }

  patch(id: number, user: UserDTO | UserRoleFormDTO | UserFormDTO | UserAvatarFormDTO) {
    return this.http.patch<UserDTO>(`${environment.host}/api/users/${id}`, user)
      .pipe(
        tap({
          next: (user) => {
            this.store.dispatch(new AddUser(user));
          }
        })
      );
  }

  clearAvatar(id: number) {
    return this.http.delete<boolean>(`${environment.host}/api/users/${id}/avatar`, {})
      .pipe(
        tap({
          next: (result) => {
            this.store.dispatch(new ClearUserAvatar(id));
          }
        })
      )
  }
  delete(id: number) {
    return this.http.delete<boolean>(`${environment.host}/api/users`)
      .pipe(
        tap({
          next: (res) => {
            if (res)
              this.store.dispatch(new RemoveUser(id));
          }
        })
      )
  }
}
