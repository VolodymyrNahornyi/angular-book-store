import {HighlightDirective} from "./highlight.directive";
import {By} from "@angular/platform-browser";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, DebugElement} from "@angular/core";

// 1. Створюємо простий standalone хост-компонент спеціально для тесту.
@Component({
  standalone: true,
  imports: [HighlightDirective], // Хост-компонент імпортує директиву, яку він використовує.
  template: `<div appHighlight>This element should be highlighted on hover.</div>`
})
class TestHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let divElement: DebugElement; // Використовуємо DebugElement для зручної роботи з подіями.

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Імпортуємо хост-компонент. Він, у свою чергу, надає директиву.
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // Початковий рендеринг.

    // 3. Знаходимо елемент, до якого застосована наша директива.
    divElement = fixture.debugElement.query(By.directive(HighlightDirective));
  });

  it('should add the "scale-on-hover" class on mouseenter', () => {
    // 4. Симулюємо подію наведення курсора.
    divElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // 5. Перевіряємо, що директива додала CSS-клас до елемента.
    expect(divElement.nativeElement.classList.contains('scale-on-hover')).toBeTrue();
  });

  it('should remove the "scale-on-hover" class on mouseout', () => {
    // Спочатку додаємо клас, щоб було що видаляти.
    divElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // Симулюємо подію відведення курсора.
    divElement.triggerEventHandler('mouseout', null);
    fixture.detectChanges();

    // Перевіряємо, що директива видалила CSS-клас.
    expect(divElement.nativeElement.classList.contains('scale-on-hover')).toBeFalse();
  });
});
