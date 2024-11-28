import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TduComponent } from './tdu.component';

describe('TduComponent', () => {
  let component: TduComponent;
  let fixture: ComponentFixture<TduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
