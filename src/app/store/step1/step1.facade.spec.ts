import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { clearStep1State, updateStep1 } from './step1.actions';
import { Step1Facade } from './step1.facade';
import { selectStep1 } from './step1.selector';
import { Step1State } from './step1.state';

describe('Step1Facade', () => {
  let facade: Step1Facade;
  let store: MockStore;
  const initialState: Step1State = { name: '', surname: '', phone: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Step1Facade, provideMockStore({ initialState: { step1: initialState } })],
    });
    facade = TestBed.inject(Step1Facade);
    store = TestBed.inject(MockStore);

    // Mock selector
    store.overrideSelector(selectStep1, initialState);
  });

  it('should select step1 state as step$', done => {
    facade.step$.subscribe(data => {
      expect(data).toEqual(initialState);
      done();
    });
  });

  it('should emit valid$ as false if any field is empty', done => {
    store.overrideSelector(selectStep1, { name: 'John', surname: '', phone: '123' });
    store.refreshState();

    facade.valid$.subscribe(valid => {
      expect(valid).toBeFalse();
      done();
    });
  });

  it('should emit valid$ as true if all fields have truthy values', done => {
    const validState: Step1State = { name: 'John', surname: 'Doe', phone: '123456789' };
    store.overrideSelector(selectStep1, validState);
    store.refreshState();

    facade.valid$.subscribe(valid => {
      expect(valid).toBeTrue();
      done();
    });
  });

  it('should dispatch updateStep1 action on update()', () => {
    const data: Step1State = { name: 'Alice', surname: 'Smith', phone: '987654321' };
    const dispatchSpy = spyOn(store, 'dispatch');

    facade.update(data);

    expect(dispatchSpy).toHaveBeenCalledWith(updateStep1(data));
  });

  it('should dispatch clearStep1State action on clear()', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    facade.clear();

    expect(dispatchSpy).toHaveBeenCalledWith(clearStep1State());
  });
});
