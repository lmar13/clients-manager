import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { apiUrlInterceptor } from './api-url.interceptor';

describe('apiUrlInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiUrlInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should prepend apiUrl from environment to the request URL', () => {
    environment.apiUrl = 'https://api.example.com';

    const fakeRequest = new HttpRequest('GET', 'clients');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const next = jasmine.createSpy().and.callFake((req: HttpRequest<any>) => req);

    interceptor(fakeRequest, next);

    expect(next).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modifiedRequest = next.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(modifiedRequest.url).toBe('https://api.example.com/clients');
  });
});
