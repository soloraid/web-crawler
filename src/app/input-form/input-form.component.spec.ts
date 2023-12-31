import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormComponent } from './input-form.component';
import {FormsModule} from '@angular/forms';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFormComponent],
      imports:[FormsModule],
    });
    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
