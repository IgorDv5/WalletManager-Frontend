import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListDeletedComponent } from './transaction-list-deleted.component';

describe('TransactionListDeletedComponent', () => {
  let component: TransactionListDeletedComponent;
  let fixture: ComponentFixture<TransactionListDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
