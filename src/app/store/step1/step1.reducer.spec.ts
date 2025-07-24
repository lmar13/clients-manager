import { clearStep1State, updateStep1 } from './step1.actions';
import { step1Reducer } from './step1.reducer';
import { initialStep1State, Step1State } from './step1.state';

describe('step1Reducer', () => {
  it('should return the initial state when an unknown action is dispatched', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = step1Reducer(undefined, action);
    expect(state).toEqual(initialStep1State);
  });

  it('should update state on updateStep1 action', () => {
    const updateData = { name: 'John', surname: 'Doe', phone: '123456789' };
    const action = updateStep1(updateData);
    const result = step1Reducer(initialStep1State, action);
    expect(result).toEqual(updateData);
  });

  it('should reset state to initial on clearStep1State action', () => {
    const modifiedState: Step1State = { name: 'Jane', surname: 'Smith', phone: '987654321' };
    const action = clearStep1State();
    const result = step1Reducer(modifiedState, action);
    expect(result).toEqual(initialStep1State);
  });
});
