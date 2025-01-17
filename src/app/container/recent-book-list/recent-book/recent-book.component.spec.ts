import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBookComponent } from './recent-book.component';

describe('RecentBookComponent', () => {
  let component: RecentBookComponent;
  let fixture: ComponentFixture<RecentBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
