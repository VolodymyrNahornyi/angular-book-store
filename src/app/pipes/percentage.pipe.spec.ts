import { PercentagePipe } from './percentage.pipe';

describe('PercentagePipe', () => {
  // 1. Створюємо екземпляр пайпа один раз, оскільки він не має внутрішнього стану.
  const pipe = new PercentagePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should calculate a simple percentage correctly', () => {
    const originalPrice = 100;
    const discountPrice = 75;

    // 2. Викликаємо метод transform з тестовими даними.
    const result = pipe.transform(originalPrice, discountPrice);

    // 3. Перевіряємо, що результат відповідає очікуваному рядку.
    expect(result).toBe('25% Off');
  });

  it('should round the percentage to the nearest integer', () => {
    const originalPrice = 30;
    const discountPrice = 10; // 10 / 30 = 0.333... -> 33.33% => 66.67% discount

    const result = pipe.transform(originalPrice, discountPrice);

    // Перевіряємо, що Math.round(66.66...) дає 67.
    expect(result).toBe('67% Off');
  });

  it('should return "0% Off" when prices are the same', () => {
    const result = pipe.transform(50, 50);
    expect(result).toBe('0% Off');
  });
});
