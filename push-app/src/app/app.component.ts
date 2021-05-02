import { Component } from '@angular/core';
import { PushNotificationService, PushNotificationOptions } from 'ngx-push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'push-app';

  constructor(private pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    this.pushNotificationService.requestPermission();
    this.pushNotificationNow();
  }

  pushNotificationNow() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'his is a test notification';

    this.pushNotificationService.create(title, options).subscribe(
      (notif) => {
        if (notif.event.type === 'show') {
          console.log("Event is show");
          setTimeout(() => {
            notif.notification.close();
          }, 3000);
        }
        if (notif.event.type === 'click') {
          console.log("Event is click");
          notif.notification.close();
        }
        if (notif.event.type === 'close') {
          console.log("Event is close");
        }
      },
      err => {
        console.log("Error is..", err);
      });
  }
}
