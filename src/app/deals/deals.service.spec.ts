import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/operator/toPromise';

import { DealsService } from './deals.service';
import { Deal } from './deal';

const mockDeals = {
  deals: [
  {
    'title': 'Unlimited Broadband & Weekend Calls',
    'prices': [
      {
        'periods': [
          {
            'months': 18,
            'amount': 19.5
          },
          {
            'months': null,
            'amount': 28.5
          }
        ],
        'firstYear': 241,
        'totalContractCost': 358,
        'upFrontCost': 7,
        'upsell': null
      }
    ],
    'id': 4930,
    'contractLength': 18,
    'tvProduct': null,
    'standardChannels': null,
    'totalChannels': null,
    'hdChannels': null,
    'speed': {
      'label': '17',
      'sortValue': 17408
    },
    'uploadSpeed': {
      'label': '1',
      'sortValue': 1024
    },
    'usage': {
      'label': 'Unlimited',
      'sortValue': 1000
    },
    'mobile': null,
    'offer': {
      'type': 'None',
      'title': '£50 cancellation credit',
      'smallLogo': 'https://bucket.cdndtl.co.uk/bc/ICONS_70x70/13102016ICONS/Icon-EE-50Cancellation.png',
      'expiresAt': '2018-04-05T05:30:00Z'
    },
    'provider': {
      'id': 48,
      'name': 'EE',
      'logo': 'https://bucket.cdndtl.co.uk/bc/providerlogos/ee_99.png'
    },
    'newLineCost': 30,
    'upfrontCosts': [
      {
        'name': 'Total',
        'price': 7
      },
      {
        'name': 'Delivery',
        'price': 7
      },
      {
        'name': 'Hardware',
        'price': 0
      },
      {
        'name': 'Installation',
        'price': 0
      },
      {
        'name': 'New Line',
        'price': 30
      }
    ],
    'productTypes': [
      'Broadband',
      'Phone'
    ],
    'premiumFeatures': {

    },
    'popularChannels': [

    ]
  },
  {
    'title': 'Total Entertainment + Unlimited Infinity 2 + Weekend Calls',
    'prices': [
      {
        'selectedOptions': [

        ],
        'periods': [
          {
            'months': 12,
            'amount': 67.99
          }
        ],
        'firstYear': 825.87,
        'totalContractCost': 825.87,
        'upFrontCost': 9.99,
        'upsell': null
      }
    ],
    'id': 4138,
    'contractLength': 12,
    'tvProduct': 'Total entertainment',
    'standardChannels': {
      'label': '94',
      'sortValue': 94
    },
    'totalChannels': {
      'label': '139',
      'sortValue': 139
    },
    'hdChannels': {
      'label': '23',
      'sortValue': 23
    },
    'speed': {
      'label': '76',
      'sortValue': 77824
    },
    'uploadSpeed': {
      'label': '19',
      'sortValue': 19456
    },
    'usage': {
      'label': 'Truly Unlimited',
      'sortValue': 1001
    },
    'mobile': null,
    'offer': {
      'type': 'OnlineExclusive',
      'title': '£150 BT Reward Card - see BT\'s website for further details',
      'smallLogo': 'https://bucket.cdndtl.co.uk/bc/ICONS_70x70/BT_150reward.png',
      'expiresAt': '2016-11-07T23:55:00Z'
    },
    'provider': {
      'id': 3,
      'name': 'BT',
      'logo': 'https://bucket.cdndtl.co.uk/bc/providerlogos/bt_99.png'
    },
    'newLineCost': 0,
    'upfrontCosts': [
      {
        'name': 'Total',
        'price': 9.99
      },
      {
        'name': 'Delivery',
        'price': 9.99
      },
      {
        'name': 'Hardware',
        'price': 0
      },
      {
        'name': 'Installation',
        'price': 0
      },
      {
        'name': 'New Line',
        'price': 0
      }
    ],
    'productTypes': [
      'TV',
      'Phone',
      'Broadband'
    ],
    'premiumFeatures': {
      'BTSport': true,
      'ComedyCentral': true,
      'DiscoveryChannel': true,
      'CartoonNetwork': true,
      'DisneyChannel': true
    },
    'popularChannels': [
      {
        'name': 'BT Sport 1',
        'channelCategory': 'Sport',
        'logo': 'https://bucket.cdndtl.co.uk/Europe/England/priority-channels/bt-sport-1.png'
      },
      {
        'name': 'Film4',
        'channelCategory': 'Movies',
        'logo': 'https://bucket.cdndtl.co.uk/Europe/England/priority-channels/film4.png'
      },
      {
        'name': 'E4',
        'channelCategory': 'Entertainment',
        'logo': 'https://bucket.cdndtl.co.uk/Europe/England/priority-channels/e4.png'
      },
      {
        'name': 'Dave',
        'channelCategory': 'Entertainment',
        'logo': 'https://bucket.cdndtl.co.uk/Europe/England/priority-channels/dave.png'
      }
    ]
  }
]};

describe('DealsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        { provide: DealsService, useClass: DealsService }
      ]
    });
  });

  it('should be created', inject([DealsService], (service: DealsService) => {
    expect(service).toBeTruthy();
  }));

  it(`should returns empty set of deals when data isn't available from server`,
    async(inject([DealsService, XHRBackend], (service: DealsService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({deals: []})
        })));
      });

      service.getAll().then(deals => {
        expect(deals.length).toBe(0);
      });
    })));

  it('should returns non-empty set of deals when 2 deals are available from service',
    async(inject([DealsService, XHRBackend], (service: DealsService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockDeals)
        })));
      });

      service.getAll().then(deals => {
        expect(deals.length).toBe(2);
      });
    })));

  it(`should raise right exception when service isn't available`,
    async(inject([DealsService, XHRBackend], (service: DealsService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Error('service error'));
      });

      service.getAll().catch(error => {
        expect(error).toBe('Error in loading deals. service error');
      });
    })));

  it(`should raise right exception when service isn't available and error doesn't have message`,
    async(inject([DealsService, XHRBackend], (service: DealsService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockError(new Error());
      });

      service.getAll().catch(error => {
        expect(error).toBe('Error in loading deals. Error');
      });
    })));
});
