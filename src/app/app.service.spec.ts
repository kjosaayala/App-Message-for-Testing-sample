import { TestBed } from "@angular/core/testing";

import { AppService } from "./app.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AppService", () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
    });
    service = TestBed.inject(AppService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("Testeando sendMessage", () => {
    it("Debe retornar el resolve porque el mensaje es valido ", async () => {
      const message = "Hola Mundo!";
      const result = await service.sendMessage(message);
      expect(result).toBe(message);
    });

    it("Debe retornar el reject porque el mensaje es nulo", async () => {
      await expectAsync(service.sendMessage(null as any)).toBeRejectedWith(
        "Message is null, empty, or undefined"
      );
    });

    it("Debe retornar el reject porque el mensaje esta vacio", async () => {
      await expectAsync(service.sendMessage("")).toBeRejectedWith(
        "Message is null, empty, or undefined"
      );
    });

    it("Debe retornar el reject porque el mensaje es indefinido", async () => {
      await expectAsync(service.sendMessage(undefined as any)).toBeRejectedWith(
        "Message is null, empty, or undefined"
      );
    });
  });

  describe("Testeando deleteMessages", () => {
    it("Debe retornar el resolve porque el listado de mensajes tiene elementos", async () => {
      const messages = ["Hola Mundo", "Estamos Testeando"];
      const result = await service.deleteMessages(messages);
      expect(result).toEqual([]);
    });

    it("Debe retornar el reject porque el array esta vacio", async () => {
      await expectAsync(service.deleteMessages([])).toBeRejectedWith(
        "No messages to delete"
      );
    });

    it("Debe retornar el reject porque el array esta nulo", async () => {
      await expectAsync(service.deleteMessages(null as any)).toBeRejectedWith(
        "No messages to delete"
      );
    });

    it("Debe retornar el reject porque el array esta indefinido", async () => {
      await expectAsync(
        service.deleteMessages(undefined as any)
      ).toBeRejectedWith("No messages to delete");
    });
  });
});
