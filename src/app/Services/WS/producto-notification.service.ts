import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoNotificationService {
    constructor() { 
    if(!window.Echo){
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: environment.pusher.key,
        cluster: environment.pusher.cluster,
        encrypted: false,
        wsHost: window.location.hostname,
        wssPort: 6001,
        wsPort: 6001,
        disableStats: true,
      });
    }
  }

  leaveChannel(channel: string) {
    if(window.Echo){
      window.Echo.leave(channel);
    }
  }

  listen(channel: string, event: string, callback: Function) {
    window.Echo?.channel(channel).listen(event, callback);
  }

  lsitenToEvent(callback: (e: any) => void) {
    window.Echo?.channel('product')
      .listen('.Product.event', (e: any) => { 
        callback(e); 
      });
  }


}
