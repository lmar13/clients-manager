import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialStep1State } from '../../store/step1/step1.state';
import { Step3Component } from './step3.component';
import { initialCurrentStepState } from '../../store/currentStep/currentStep.state';
import { initialStep2State } from '../../store/step2/step2.state';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3Component],
      providers: [
        provideMockStore({
          initialState: { currentStep: initialCurrentStepState, step1: initialStep1State, step2: initialStep2State },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
