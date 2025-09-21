import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {

    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getJwtToken', () => {

    it('should return a JWT token from localStorage', () => {
      const token = 'test-jwt-token';
      localStorage.setItem('jwtToken', token);
      expect(service.getJwtToken()).toBe(token);
    });

    it('should return null if token is not in localStorage', () => {
      const result: string = service.getJwtToken();

      expect(result).toBeNull();
    });

  });

  describe('addJwtToken', () => {

    it('should add a JWT token to localStorage', () => {
      const token = 'test-jwt-token';
      service.addJwtToken(token);
      expect(localStorage.getItem('jwtToken')).toBe(token);
    });

  });

  describe('deleteJwtToken', () => {

    it('should delete a JWT token from localStorage', () => {
      const token = 'test-jwt-token';
      localStorage.setItem('jwtToken', token);

      service.deleteJwtToken();
      expect(localStorage.getItem('jwtToken')).toBeNull();
    });

  });

});
