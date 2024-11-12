import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MessagesListComponent } from "./messages-list.component";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import {
  MatRowHarness,
  MatTableHarness,
} from "@angular/material/table/testing";

describe("Probando MessagesListComponent", () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MessagesListComponent,
        MatTableModule,
        BrowserAnimationsModule,
        CommonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Input: messages", () => {
    it("Convirtiendo string array a iMessage array y set _messages signal", () => {
      const messages = ["Hello World", "Hello Cats"];
      component.messages = messages;

      const expectedMessages = messages.map((msg) => ({ message: msg }));
      expect(component._messages()).toEqual(expectedMessages);
    });
  });

  it("length de _messages() debe ser igual al de mensajes enviados al input", async () => {
    const messages = ["Hello World", "Hello Cats"];
    component.messages = messages;

    fixture.detectChanges();

    const items = component._messages();
    expect(items.length).toBe(2);
  });

  it("Debe renderizar la misma cantidad de rows segun el array de mensajes enviado - Probando Harnesses de Angular Material", async () => {
    const messages = ["Hello World", "Hello Cats"];
    component.messages = messages;
    fixture.detectChanges();

    const rows = await loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toBe(messages.length);
  });

  it("Debe renderizar la misma cantidad de rows segun el array de mensajes enviado - Probando Harnesses de Angular Material usando un selector", async () => {
    const messages = ["Hello World", "Hello Cats"];
    component.messages = messages;
    fixture.detectChanges();

    const table = await loader.getHarness(
      MatTableHarness.with({ selector: "#messages-table" })
    );
    const rows = await table.getRows();
    expect(rows.length).toBe(2);
  });
});
