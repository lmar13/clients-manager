import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ListApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
