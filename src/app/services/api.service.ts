import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * User endpoints start here
   */
  //create new user
  createUser(newUser: any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'} ) };
    return this.http.post('users/createUser',newUser, httpOptions);
  }

  loginUser(currentUser: any){
    console.log('sending you: ', currentUser);
    const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
    return this.http.post('users/login', currentUser, httpOptions);
  }

  resetPassword(currentUser: any){
    const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
    return this.http.put('users/resetPassword', currentUser, httpOptions);
  }

  getUser(token: any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'} ) };
    return this.http.post('users/getUser',token, httpOptions);
  }

  updateName(currentUser: any){
    const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
    return this.http.put('users/updateName', currentUser, httpOptions);
  }

  updateUsername(currentUser: any){
    const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
    return this.http.put('users/updateUsername', currentUser, httpOptions);
  }


  /**
   * User endpoints end here
   */

  /**
   * Text endpoints start here
   */

   createTextChannel(messageObject: any){
    const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
    return this.http.post('/textChannel/createNewChannel', messageObject, httpOptions);
   }

   getAllChannels(){
     return this.http.get<any>('/textChannel/getCurrentChannels');
   }

   //replyToUser
   replyToUser(messageObject: any){
     console.log("sending you: ", messageObject);
    const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
    return this.http.post('/textChannel/replyToUser', messageObject, httpOptions);
   }

   exitChat(currentUser: any){
     console.log("Called");
   const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
   return this.http.put('/textChannel/endChat', currentUser, httpOptions);
  }

  /**
   * Text endpoints end here
   */


   //newSOS

   /**
   * SOS endpoints start here
   */

  sendSOS(sosObject: any){
    console.log("sending you: ", sosObject);
   const httpOptions = { headers: new HttpHeaders( { 'Content-Type': 'application/json' })};
   return this.http.post('/textChannel/newSOS', sosObject, httpOptions);
  }

   /**
   * SOS endpoints end here
   */




}
