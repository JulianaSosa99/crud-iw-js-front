// src/app/core/session.service.ts (o donde prefieras)
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public sessionExpired = false;
}
