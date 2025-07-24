import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { clearStep2State, updateStep2 } from './step2.actions';
import { Step2Facade } from './step2.facade';
import { selectStep2 } from './step2.selector';
import { Step2State } from './step2.state';

describe('Step2Facade', () => {
  let facade: Step2Facade;
  let store: MockStore;

  const initialStep2State: Step2State = {
    interests: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Step2Facade,
        provideMockStore({
          selectors: [{ selector: selectStep2, value: initialStep2State }],
        }),
      ],
    });

    facade = TestBed.inject(Step2Facade);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should select step2 state via step$', done => {
    facade.step$.subscribe(value => {
      expect(value).toEqual(initialStep2State);
      done();
    });
  });

  it('should dispatch updateStep2 action when update() called', () => {
    const updateData: Step2State = { interests: ['music', 'sport'] };
    facade.update(updateData);
    expect(store.dispatch).toHaveBeenCalledWith(updateStep2(updateData));
  });

  it('should dispatch clearStep2State action when clear() called', () => {
    facade.clear();
    expect(store.dispatch).toHaveBeenCalledWith(clearStep2State());
  });
});
