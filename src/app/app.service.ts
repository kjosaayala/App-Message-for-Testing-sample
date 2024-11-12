import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppService {
  sendMessage(message: string) {
    return new Promise((resolve, reject) => {
      if (!message) {
        reject("Message is null, empty, or undefined");
      } else {
        resolve(message);
      }
    });
  }

  deleteMessages(messages: string[]) {
    return new Promise((resolve, reject) => {
      if (!messages || messages.length === 0) {
        reject("No messages to delete");
      } else {
        resolve([]);
      }
    });
  }
}
