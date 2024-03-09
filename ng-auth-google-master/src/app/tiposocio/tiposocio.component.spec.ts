import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposocioComponent } from './tiposocio.component';

describe('TiposocioComponent', () => {
  let component: TiposocioComponent;
  let fixture: ComponentFixture<TiposocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposocioComponent]
    });
    fixture = TestBed.createComponent(TiposocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
