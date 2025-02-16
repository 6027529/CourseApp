import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAdPage } from './add-ad.page';

describe('AddAdPage', () => {
  let component: AddAdPage;
  let fixture: ComponentFixture<AddAdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
