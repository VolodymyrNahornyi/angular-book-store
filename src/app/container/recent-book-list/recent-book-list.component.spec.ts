import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBookListComponent } from './recent-book-list.component';

describe('RecentBookListComponent', () => {
  let component: RecentBookListComponent;
  let fixture: ComponentFixture<RecentBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentBookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
