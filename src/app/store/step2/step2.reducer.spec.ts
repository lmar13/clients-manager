import { step2Reducer } from './step2.reducer';
import { updateStep2, clearStep2State } from './step2.actions';
import { initialStep2State, Step2State } from './step2.state';

describe('step2Reducer', () => {
  it('should return the initial state when an unknown action is dispatched', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action = { type: 'UNKNOWN' } as any;
    const state = step2Reducer(undefined, action);
    expect(state).toEqual(initialStep2State);
  });

  it('should update interests on updateStep2 action', () => {
    const newInterests = ['music', 'sports'];
    const action = updateStep2({ interests: newInterests });
    const result = step2Reducer(initialStep2State, action);
    expect(result.interests).toEqual(newInterests);
  });

  it('should reset state to initial on clearStep2State action', () => {
    const modifiedState: Step2State = { interests: ['reading'] };
    const action = clearStep2State();
    const result = step2Reducer(modifiedState, action);
    expect(result).toEqual(initialStep2State);
  });
});
