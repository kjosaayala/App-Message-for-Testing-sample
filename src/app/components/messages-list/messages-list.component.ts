import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
  signal,
} from "@angular/core";
import { MatTableModule } from "@angular/material/table";

export interface iMessage {
  message: string;
}

@Component({
  selector: "app-messages-list",
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: "./messages-list.component.html",
  styleUrl: "./messages-list.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  _messages: WritableSignal<iMessage[]> = signal([]);
  displayedColumns: string[] = ["message"];

  @Input({ required: true })
  set messages(value: string[]) {
    const messageItems: iMessage[] = value.map((item) => ({ message: item }));
    if (this._messages() !== messageItems) {
      this._messages.set(messageItems);
    }
  }
}
