import {
  Component,
  WritableSignal,
  signal,
  ChangeDetectionStrategy,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MessageComponent } from "./components/message/message.component";
import { MatButtonModule } from "@angular/material/button";
import { MessagesListComponent } from "./components/messages-list/messages-list.component";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [MessageComponent, MatButtonModule, MessagesListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = "Hello, app-message";
  _messages: WritableSignal<string[]> = signal([]);

  constructor(private _appService: AppService) {}

  sendMessage(message: string) {
    this._appService.sendMessage(message).then(
      (result) => {
        const copyMessages = [...this._messages(), message];
        this._messages.set(copyMessages);
      },
      (error) => window.alert(error)
    );
  }

  removeMessages() {
    this._appService.deleteMessages(this._messages()).then(
      (result) => {
        this._messages.set([]);
      },
      (error) => window.alert(error)
    );
  }
}
