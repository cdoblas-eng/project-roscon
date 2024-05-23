import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablarosconesComponent } from './tablaroscones.component';

describe('TablarosconesComponent', () => {
  let component: TablarosconesComponent;
  let fixture: ComponentFixture<TablarosconesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablarosconesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablarosconesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
