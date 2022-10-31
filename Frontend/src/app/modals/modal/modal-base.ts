export abstract class ModalBase {
  public addingItem!: boolean;

  public abstract edit(): void;
  public abstract add(value: any): void;

  protected abstract adding(): boolean;
  protected abstract clearValues(): void;
}
