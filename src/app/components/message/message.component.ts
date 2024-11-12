import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-message",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./message.component.html",
  styleUrl: "./message.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Output() sendMessage = new EventEmitter<string>();
  _message: WritableSignal<string> = signal("");

  @Input({ required: false })
  set message(value: string) {
    this._message.set(value);
  }

  onSendMessage() {
    this.sendMessage.emit(this._message());
  }

  onCancelMessage() {
    this._message.set("");
  }
}
