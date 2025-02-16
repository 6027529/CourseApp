import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let storageMock: Storage;
  let jwtHelper: JwtHelperService;

  const apiUrl = 'http://localhost:5000';  // Backend API URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JwtHelperService, Storage]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    storageMock = TestBed.inject(Storage);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user anonymously', () => {
    const mockResponse = { message: 'User registered successfully' };
    const username = 'testuser';
    const password = 'testpassword';

    service.register(username, password).subscribe(response => {
      expect(response.message).toBe('User registered successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should login a user and store token', () => {
    const mockResponse = { access_token: 'mock-token' };
    const username = 'testuser';
    const password = 'testpassword';

    service.login(username, password).subscribe(response => {
      expect(response.access_token).toBe('mock-token');
      localStorage.setItem('access_token', response.access_token);
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send an anonymous message', () => {
    const mockResponse = { message: 'Message sent anonymously', data: 'Test message' };
    const message = 'Test message';
    const token = 'mock-token';

    // Mock JWT storage
    spyOn(localStorage, 'getItem').and.returnValue(token);

    service.sendAnonymousMessage(message).subscribe(response => {
      expect(response.message).toBe('Message sent anonymously');
      expect(response.data).toBe(message);
    });

    const req = httpMock.expectOne(`${apiUrl}/message`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ' + token);
    req.flush(mockResponse);
  });

  it('should process cryptocurrency payment', () => {
    const mockResponse = { message: 'Payment processed successfully', transactionId: '12345' };
    const paymentData = {
      amount: 0.01,
      currency: 'BTC',
      user: 'testuser'
    };

    service.processCryptocurrencyPayment(paymentData).subscribe(response => {
      expect(response.message).toBe('Payment processed successfully');
      expect(response.transactionId).toBe('12345');
    });

    const req = httpMock.expectOne(`${apiUrl}/payment/cryptocurrency`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get location-based deals', () => {
    const mockDeals = [
      { id: 1, title: 'Deal 1', description: '50% off', location: 'Amsterdam' },
      { id: 2, title: 'Deal 2', description: 'Buy 1 get 1 free', location: 'Rotterdam' }
    ];
    const location = 'Amsterdam';

    service.getLocationBasedDeals(location).subscribe(deals => {
      expect(deals.length).toBeGreaterThan(0);
      expect(deals[0].location).toBe(location);
    });

    const req = httpMock.expectOne(`${apiUrl}/deals?location=${location}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDeals);
  });

  it('should check if user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeTrue();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
