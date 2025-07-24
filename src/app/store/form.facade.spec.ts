import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Client } from '../models/client.model';
import { FormFacade } from './form.facade';
import { Step1Facade } from './step1/step1.facade';
import { Step2Facade } from './step2/step2.facade';

describe('FormFacade', () => {
  let facade: FormFacade;
  let step1FacadeSpy: jasmine.SpyObj<Step1Facade>;
  let step2FacadeSpy: jasmine.SpyObj<Step2Facade>;

  beforeEach(() => {
    step1FacadeSpy = jasmine.createSpyObj('Step1Facade', ['update', 'clear'], {
      step$: of({ name: 'John', surname: 'Doe', phone: '123456789' }),
      valid$: of(true),
    });

    step2FacadeSpy = jasmine.createSpyObj('Step2Facade', ['update', 'clear'], {
      step$: of({ interests: ['music', 'sport'] }),
    });

    TestBed.configureTestingModule({
      providers: [
        FormFacade,
        provideMockStore(),
        { provide: Step1Facade, useValue: step1FacadeSpy },
        { provide: Step2Facade, useValue: step2FacadeSpy },
      ],
    });

    facade = TestBed.inject(FormFacade);
  });

  it('should combine step1 and step2 data into data$', done => {
    facade.data$.subscribe(data => {
      expect(data).toEqual({
        name: 'John',
        surname: 'Doe',
        phone: '123456789',
        interests: ['music', 'sport'],
      });
      done();
    });
  });

  it('should call step1Facade.update and step2Facade.update when setting data', () => {
    const client: Client = {
      id: '1',
      name: 'Jane',
      surname: 'Smith',
      phone: '987654321',
      interests: ['books', 'music'],
    };

    facade.data = client;

    expect(step1FacadeSpy.update).toHaveBeenCalledWith({
      name: 'Jane',
      surname: 'Smith',
      phone: '987654321',
    });
    expect(step2FacadeSpy.update).toHaveBeenCalledWith({ interests: ['books', 'music'] });
  });

  it('should call clear on both step facades', () => {
    facade.clear();
    expect(step1FacadeSpy.clear).toHaveBeenCalled();
    expect(step2FacadeSpy.clear).toHaveBeenCalled();
  });

  it('should expose valid$ from step1Facade', done => {
    facade.valid$.subscribe(isValid => {
      expect(isValid).toBeTrue();
      done();
    });
  });
});
