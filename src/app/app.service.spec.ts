import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the app list and sort it by subscription total', () => {
    service.createAppList([
      {
        name: 'App1',
      },
      {
        name: 'App2',
      },
    ]);

    expect(service.getAppList().getValue().length).toEqual(2);
    expect(service.getAppList().getValue()[0].name).toEqual('App1');

    service.createAppList([
      {
        name: 'App1',
        subscriptions: [{ name: 'Sub', price: '1000' }],
      },
      {
        name: 'App2',
        subscriptions: [
          { name: 'Sub', price: '1000' },
          { name: 'Sub', price: '500' },
        ],
      },
      {
        name: 'App3',
        subscriptions: [{ name: 'Sub', price: '0' }],
      },
    ]);

    expect(service.getAppList().getValue().length).toEqual(3);
    expect(service.getAppList().getValue()[0].name).toEqual('App3');

    expect(service.getAppList().getValue()[1].name).toEqual('App1');

    expect(service.getAppList().getValue()[2].name).toEqual('App2');
  });

  it('should filter the app list by name', () => {
    service.createAppList([
      {
        name: 'Virtual calls',
        subscriptions: [{ name: 'Sub', price: '1000' }],
      },
      {
        name: 'Power Dialer',
        subscriptions: [
          { name: 'Sub', price: '1000' },
          { name: 'Sub', price: '500' },
        ],
      },
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
      },
    ]);

    service.filterAppsByName('er');
    expect(service.getAppList().getValue()).toEqual([
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
      },
      {
        name: 'Power Dialer',
        subscriptions: [
          { name: 'Sub', price: '1000' },
          { name: 'Sub', price: '500' },
        ],
      },
    ]);
  });

  it('should filter the app list by category', () => {
    service.createAppList([
      {
        name: 'Voice Report',
        subscriptions: [{ name: 'Sub', price: '1000' }],
        categories: ['Optimization', 'Channels'],
      },
      {
        name: 'Power Dialer',
        subscriptions: [
          { name: 'Sub', price: '1000' },
          { name: 'Sub', price: '500' },
        ],
        categories: ['Dialer'],
      },
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
        categories: ['Channels'],
      },
    ]);

    service.filterAppsByCategory('Channels');
    expect(service.getAppList().getValue()).toEqual([
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
        categories: ['Channels'],
      },
      {
        name: 'Voice Report',
        subscriptions: [{ name: 'Sub', price: '1000' }],
        categories: ['Optimization', 'Channels'],
      },
    ]);
  });

  it('should filter the app list by category and by name', () => {
    service.createAppList([
      {
        name: 'Voice Report',
        subscriptions: [{ name: 'Sub', price: '1000' }],
        categories: ['Optimization', 'Channels'],
      },
      {
        name: 'Power Dialer',
        subscriptions: [
          { name: 'Sub', price: '1000' },
          { name: 'Sub', price: '500' },
        ],
        categories: ['Dialer'],
      },
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
        categories: ['Channels'],
      },
    ]);

    service.filterAppsByCategory('Channels');
    expect(service.getAppList().getValue()).toEqual([
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
        categories: ['Channels'],
      },
      {
        name: 'Voice Report',
        subscriptions: [{ name: 'Sub', price: '1000' }],
        categories: ['Optimization', 'Channels'],
      },
    ]);

    service.filterAppsByName('er');

    expect(service.getAppList().getValue()).toEqual([
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
        categories: ['Channels'],
      }
    ]);

    service.filterAppsByCategory('');

    expect(service.getAppList().getValue()).toEqual([
      {
        name: 'Smarter Text',
        subscriptions: [{ name: 'Sub', price: '0' }],
        categories: ['Channels'],
      },
      {
        name: 'Power Dialer',
        subscriptions: [
          { name: 'Sub', price: '1000' },
          { name: 'Sub', price: '500' },
        ],
        categories: ['Dialer'],
      }]);
  });
});
