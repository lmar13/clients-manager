import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ListApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient()],
    });
    service = TestBed.inject(ApiService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
