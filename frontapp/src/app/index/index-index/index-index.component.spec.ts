import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexIndexComponent } from './index-index.component';

describe('IndexIndexComponent', () => {
  let component: IndexIndexComponent;
  let fixture: ComponentFixture<IndexIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexIndexComponent]
    });
    fixture = TestBed.createComponent(IndexIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
