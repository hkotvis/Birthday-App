import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  "../auth/user";
import { BirthdayPageComponent } from '../birthday-page/birthday-page.component'; //need this for tabs

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      this.user= user;
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
   }
   // register with email/password
   async register(email, password) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.router.navigate(['/login']);
     
  }
  // verify login credentials
   async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/list']);
  }
// logout current user
  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}

}

