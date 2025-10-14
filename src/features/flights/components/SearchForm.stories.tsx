import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm } from './SearchForm';

const meta: Meta<typeof SearchForm> = {
  title: 'Flights/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    onSubmit: { control: false },
  },
};
export default meta;

type S = StoryObj<typeof SearchForm>;

export const Default: S = { args: {} };

export const InvalidInputs: S = {
  args: { initial: { from: 'SFO', to: 'SFO', depart: '1999-01-01', pax: 0 } },
};

export const CorpPolicyBanner: S = {
  args: { showCorpPolicyBanner: true, initial: { from: '', to: '', pax: 1 } },
};

export const OneWay: S = { args: { initial: { tripType: 'ONE_WAY' } } };
export const RoundTrip: S = { args: { initial: { tripType: 'ROUND_TRIP' } } };
export const MultiCityDisabled: S = {
  args: { initial: { tripType: 'MULTI_CITY' }, multiCityEnabled: false },
};

export const WithPrefilledUserContext: S = {
  args: {
    initial: {
      from: 'SFO',
      to: 'JFK',
      depart: '2025-11-02',
      pax: 2,
      cabin: 'PREMIUM_ECONOMY',
      tripType: 'ONE_WAY',
    },
  },
};
