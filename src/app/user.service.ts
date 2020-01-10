import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router) {
  }
  url = 'http://localhost:3000/api/users';
  url2 = 'http://localhost:3000/api/user_id';
  url3 = 'http://localhost:3000/api/results/';
  url4 = 'http://localhost:3000/api/result/'


  private token: string;
  private userId: string;
  private isUserLogedIn: boolean = false;

  loginUser(userEmail, userPassword) {
    let url = this.url + '?user_name=' + userEmail + '&password=' + userPassword;
    // console.log(url);
    this.http.get<{ token: string, expiresIn: number, id: string }>(url).subscribe(res => {
      if (res) {
        this.token = res.token;
        this.userId = res.id;
        this.isUserLogedIn = true;
        const expiresIn = res.expiresIn;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + (expiresIn * 1000));
        this.saveAuthData(res.token, expirationDate);
        this.router.navigateByUrl('home-page/' + this.userId);
      }
    }, _=>{
      alert("USERNAME OR PASSWORD IS INCORRECT!");
    });
  }

  isUserAuth() {
    return this.isUserLogedIn;
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  getUserById(userId) {
    let url2 = this.url2 + "?user_id=" + userId;
    // console.log(url);
    return this.http.get(url2);
  }

  deleteResult(resultId, imageUrl) {
    let url3 = this.url3 + resultId + '/' + imageUrl;
    return this.http.delete(url3);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (authInformation) {
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isUserLogedIn = true;
      }
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  logOutUser() {
    this.token = null;
    this.isUserLogedIn = false;
    this.userId = null;
    this.clearAuthData();
    this.router.navigateByUrl('/');
  }

  getToken(){
    return this.token;
  }

  registerUser(user: any){
    return this.http.post(this.url, user);
  }

  getResult(imageData: FormData){
    return this.http.post(this.url4, imageData);
  }

  uploadResult(uploaddata: FormData){
    return this.http.post('http://localhost:3000/api/results', uploaddata);
  }

  getResultById(user_id: string){
    return this.http.get('http://localhost:3000/api/results?user_id=' + user_id);
  }
}
