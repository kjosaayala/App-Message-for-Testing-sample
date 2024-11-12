import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessageComponent } from "./message.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";

describe("MessageComponent Testing", () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MessageComponent,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;

    spyOn(component.sendMessage, "emit");

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit sendMessage event with correct message on send", () => {
    const testMessage = "Hello World";
    component._message.set(testMessage);

    fixture.detectChanges();

    const sendButton = fixture.debugElement.query(
      By.css('[data-testid="send-message"]')
    )?.nativeElement as HTMLButtonElement;
    sendButton.click();

    expect(component.sendMessage.emit).toHaveBeenCalledWith(testMessage);
  });

  it('should clear the message when cancel button is clicked', () => {
    component._message.set('This will be cleared');
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('[data-testid="cancel-message"]')
    )?.nativeElement as HTMLButtonElement;
    cancelButton.click();

    expect(component._message()).toBe('');
  });

  describe("Sending a message throug the input", () => {
    it("should update _message when message input is set", () => {
      const testMessage = "Hello Test";
      component.message = testMessage;
      fixture.detectChanges();

      expect(component._message()).toBe(testMessage);
    });
  });
});
