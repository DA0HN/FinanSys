export const Required = (target: object, propertyKey: string) => {
  Object.defineProperty(target, propertyKey, {
    get(): void {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value): void {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  });
};
