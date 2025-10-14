import type { Meta, StoryObj } from '@storybook/react';
import { FlightCard } from './FlightCard';

const meta: Meta<typeof FlightCard> = {
  title: 'Flights/FlightCard',
  component: FlightCard,
  parameters: { layout: 'padded' },
};
export default meta;

type S = StoryObj<typeof FlightCard>;

const baseFlight = {
  id: 'UA123',
  carrier: 'United',
  from: 'SFO',
  to: 'JFK',
  depart: '2025-11-02T08:00:00Z',
  arrive: '2025-11-02T16:20:00Z',
  durationMins: 500,
  stops: 0,
  price: 428,
  currency: 'USD',
  logoUrl: 'https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo-500x313.png',
};

export const Default: S = {
  args: { flight: baseFlight },
};

export const WithBaggageNote: S = {
  args: {
    flight: {
      ...baseFlight,
      id: 'DL456',
      carrier: 'Delta',
      baggageNote: 'Includes 1 checked bag',
      logoUrl: 'https://1000logos.net/wp-content/uploads/2017/09/Delta-Air-Lines-Logo-500x313.png',
    },
  },
};

export const OneStop: S = {
  args: {
    flight: {
      ...baseFlight,
      id: 'AA789',
      carrier: 'American',
      stops: 1,
      durationMins: 520,
      logoUrl: 'https://1000logos.net/wp-content/uploads/2016/10/American-Airlines-Logo-500x313.png',
    },
  },
};

export const CorporateFareLocked: S = {
  args: {
    flight: {
      ...baseFlight,
      id: 'QR212',
      carrier: 'Qatar',
      baggageNote: 'Corporate fare - locked',
      logoUrl: 'https://1000logos.net/wp-content/uploads/2020/03/Qatar-Airways-Logo-500x313.png',
    },
  },
};

export const LongHaul: S = {
  args: {
    flight: {
      ...baseFlight,
      id: 'SQ318',
      carrier: 'Singapore',
      durationMins: 900,
      price: 890,
      stops: 1,
      logoUrl: 'https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo-500x313.png',
    },
  },
};
