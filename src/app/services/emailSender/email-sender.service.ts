import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEmail } from '../../Interfaces/IEmail';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  constructor(private http: HttpClient) { }

  /* tslint:disable */
  /**
   * Makes an http call to the cloud function that communicates with SendGrid to send the email
   * @param emailInfo Information about the email to be sent
   */
  sendEmail(emailInfo: IEmail): Observable<any> {
    const url: string = 'https://us-central1-artinwebsite-fbee3.cloudfunctions.net/httpMail';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(url, emailInfo);
  }
  /* tslint:enable */
}
