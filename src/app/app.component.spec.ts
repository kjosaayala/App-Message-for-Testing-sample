import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { MessageComponent } from "./components/message/message.component";
import { MessagesListComponent } from "./components/messages-list/messages-list.component";
import { MatButtonModule } from "@angular/material/button";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appServiceSpy: jasmine.SpyObj<AppService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("AppService", [
      "sendMessage",
      "deleteMessages",
    ]);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppComponent,
        MessageComponent,
        MessagesListComponent,
        MatButtonModule,
      ],
      providers: [{ provide: AppService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appServiceSpy = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'Hello, app-message'`, () => {
    expect(component.title).toEqual("Hello, app-message");
  });

  describe("sendMessage", () => {
    it("should call sendMessage on AppService with correct message", async () => {
      const testMessage = "Test Message";

      appServiceSpy.sendMessage.and.returnValue(Promise.resolve(testMessage));

      await component.sendMessage(testMessage);

      expect(appServiceSpy.sendMessage).toHaveBeenCalledWith(testMessage);
      expect(component._messages()).toContain(testMessage);
    });

    it("should show an alert when sendMessage fails", async () => {
      spyOn(window, "alert");
      const testMessage = "Failed Message";

      appServiceSpy.sendMessage.and.returnValue(Promise.reject("Error"));

      await component.sendMessage(testMessage);

      expect(window.alert).toHaveBeenCalledWith("Error");
    });
  });

  describe("removeMessages", () => {
    it("should call deleteMessages on AppService with current messages", async () => {
      const messages = ["Message 1", "Message 2"];
      component._messages.set(messages);

      appServiceSpy.deleteMessages.and.returnValue(Promise.resolve([]));

      await component.removeMessages();

      expect(appServiceSpy.deleteMessages).toHaveBeenCalledWith(messages);
      expect(component._messages()).toEqual([]);
    });

    it("should show an alert when deleteMessages fails", async () => {
      spyOn(window, "alert");
      const messages = ["Message 1", "Message 2"];
      component._messages.set(messages);

      appServiceSpy.deleteMessages.and.returnValue(Promise.reject("Error"));

      await component.removeMessages();

      expect(window.alert).toHaveBeenCalledWith("Error");
    });
  });
});
