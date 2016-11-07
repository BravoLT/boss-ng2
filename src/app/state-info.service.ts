import { Injectable } from '@angular/core';

export interface StateInfo {
  name: string;
  abbrev: string;
}

const STATE_DATA: StateInfo[] = [
  { abbrev: 'AL', name: 'Alabama' },
  { abbrev: 'AK', name: 'Alaska' },
  { abbrev: 'AZ', name: 'Arkansas' },
  { abbrev: 'AR', name: 'Arizona' },
  { abbrev: 'CA', name: 'California' },
  { abbrev: 'CO', name: 'Colorado' },
  { abbrev: 'CT', name: 'Connecticut' },
  { abbrev: 'DE', name: 'Delaware' },
  { abbrev: 'FL', name: 'Florida' },
  { abbrev: 'GA', name: 'Georgia' },
  { abbrev: 'HI', name: 'Hawaii' },
  { abbrev: 'ID', name: 'Idaho' },
  { abbrev: 'IL', name: 'Illinois' },
  { abbrev: 'IN', name: 'Indiana' },
  { abbrev: 'IA', name: 'Iowa' },
  { abbrev: 'KS', name: 'Kansas' },
  { abbrev: 'KY', name: 'Kentucky' },
  { abbrev: 'LA', name: 'Louisiana' },
  { abbrev: 'ME', name: 'Maine' },
  { abbrev: 'MD', name: 'Maryland' },
  { abbrev: 'MA', name: 'Massachusets' },
  { abbrev: 'MI', name: 'Michigan' },
  { abbrev: 'MN', name: 'Minnesota' },
  { abbrev: 'MS', name: 'Mississippi' },
  { abbrev: 'MO', name: 'Missouri' },
  { abbrev: 'MT', name: 'Montana' },
  { abbrev: 'NE', name: 'Nebraska' },
  { abbrev: 'NV', name: 'Nevada' },
  { abbrev: 'NH', name: 'New Hampshire' },
  { abbrev: 'NJ', name: 'New Jersey' },
  { abbrev: 'NM', name: 'New Mexico' },
  { abbrev: 'NY', name: 'New York' },
  { abbrev: 'NC', name: 'North Carolina' },
  { abbrev: 'ND', name: 'North Dakota' },
  { abbrev: 'OH', name: 'Ohio' },
  { abbrev: 'OK', name: 'Oklahoma' },
  { abbrev: 'OR', name: 'Oregon' },
  { abbrev: 'PA', name: 'Pennsylvania' },
  { abbrev: 'RI', name: 'Rhode Island' },
  { abbrev: 'SC', name: 'South Carolina' },
  { abbrev: 'SD', name: 'South Dakota' },
  { abbrev: 'TN', name: 'Tennessee' },
  { abbrev: 'TX', name: 'Texas' },
  { abbrev: 'UT', name: 'Utah' },
  { abbrev: 'VT', name: 'Vermont' },
  { abbrev: 'VA', name: 'Virginia' },
  { abbrev: 'WA', name: 'Washington' },
  { abbrev: 'WV', name: 'West Virginia' },
  { abbrev: 'WI', name: 'Wisconsin' },
  { abbrev: 'WY', name: 'Wyoming' }
];

const statesByAbbrev = new Map<string, StateInfo>();
const statesByName = new Map<string, StateInfo>();

@Injectable()
export class StateInfoService {

  constructor() {
    STATE_DATA.forEach(s => {
      statesByAbbrev.set(s.abbrev, s);
      statesByName.set(s.name, s);
    });
  }

  getAllStates() {
    return STATE_DATA;
  }

  getStateByAbbrev(abbrev: string) {
    return statesByAbbrev.get(abbrev);
  }

  getStateByName(name: string) {
    return statesByName.get(name);
  }

}
