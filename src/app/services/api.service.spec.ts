import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Client } from '../models/client.model';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch clients', () => {
    const mockClients: Client[] = [{ id: '1', name: 'John' } as Client, { id: '2', name: 'Jane' } as Client];

    service.getClients().subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne('getClients');
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);
  });

  it('should fetch client by id', () => {
    const mockClient: Client = { id: '1', name: 'John' } as Client;

    service.getClientById('1').subscribe(client => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne('getClientById?id=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should add a client', () => {
    const newClient: Partial<Client> = { name: 'New Client' };
    const createdClient: Client = { id: '3', name: 'New Client' } as Client;

    service.addClient(newClient).subscribe(client => {
      expect(client).toEqual(createdClient);
    });

    const req = httpMock.expectOne('addClient');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(createdClient);
  });

  it('should update a client', () => {
    const updatedClient: Client = { id: '1', name: 'Updated' } as Client;

    service.updateClient('1', updatedClient).subscribe(client => {
      expect(client).toEqual(updatedClient);
    });

    const req = httpMock.expectOne('updateClient?id=1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedClient);
    req.flush(updatedClient);
  });

  it('should remove a client', () => {
    service.removeClient('1').subscribe(res => {
      expect(res).toBe('OK');
    });

    const req = httpMock.expectOne('removeClient?id=1');
    expect(req.request.method).toBe('DELETE');
    req.flush('OK');
  });
});
