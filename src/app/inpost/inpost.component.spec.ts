import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpostComponent } from './inpost.component';

describe('InpostComponent', () => {
  let component: InpostComponent;
  let fixture: ComponentFixture<InpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
