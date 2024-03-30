import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AppEnvironments } from '../core/config/app-environments';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private readonly hubConnectionBuilder;

  readonly hubConnection;

  constructor() {
    this.hubConnectionBuilder = new HubConnectionBuilder();
    this.hubConnection = this.hubConnectionBuilder.withUrl(AppEnvironments.baseHubUrl).build();
  }

  start(): void {
    this.hubConnection.start();
  }

  stop(): void {
    this.hubConnection.stop();
  }
}
