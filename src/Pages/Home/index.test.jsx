import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import Home from '.';

let mock;

const toolsRegex = /.*\/tools/;

const allToolsResponse = [
  {
    id: 1,
    title: 'Hammer',
    link: 'https://hammer.smash',
    description:
      'A hammer to smash things',
    tags: ['smash', 'heavy'],
  },
  {
    id: 2,
    title: 'Screwdriver',
    link: 'https://screwdriver.screw',
    description:
      'A screwdriver to screw the screws',
    tags: ['screw', 'light'],
  },
  {
    id: 3,
    title: 'Handsaw',
    link: 'https://handsaw.saw',
    description:
      'A handsaw to saw some wood',
    tags: ['wood', 'saw'],
  },
];

describe('Home', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(toolsRegex).reply(200, allToolsResponse);
  });

  afterEach(() => {
    mock.reset();
  });

  it('Should open modal', () => {
    render(<Home />);

    userEvent.click(screen.getByRole('button', { name: /Add/ }));

    expect(screen.getByText(/Add new tool/)).toBeInTheDocument();
  });

  it('Should search the tools by the title and show all tools when the search input is empty', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    expect(screen.queryByText('Hammer')).toBeInTheDocument();
    expect(screen.queryByText('A hammer to smash things')).toBeInTheDocument();
    expect(screen.queryByText('Screwdriver')).toBeInTheDocument();
    expect(screen.queryByText('A screwdriver to screw the screws')).toBeInTheDocument();
    expect(screen.queryByText('Handsaw')).toBeInTheDocument();
    expect(screen.queryByText('A handsaw to saw some wood')).toBeInTheDocument();

    const searchField = screen.getByPlaceholderText('search by title or tag');
    userEvent.type(searchField, 'hands');

    expect(screen.queryByText('Hammer')).not.toBeInTheDocument();
    expect(screen.queryByText('A hammer to smash things')).not.toBeInTheDocument();
    expect(screen.queryByText('Screwdriver')).not.toBeInTheDocument();
    expect(screen.queryByText('A screwdriver to screw the screws')).not.toBeInTheDocument();
    expect(screen.queryByText('Handsaw')).toBeInTheDocument();
    expect(screen.queryByText('A handsaw to saw some wood')).toBeInTheDocument();

    userEvent.clear(searchField);

    expect(await screen.findByText('Hammer')).toBeInTheDocument();
    expect(screen.queryByText('A hammer to smash things')).toBeInTheDocument();
    expect(screen.queryByText('Screwdriver')).toBeInTheDocument();
    expect(screen.queryByText('A screwdriver to screw the screws')).toBeInTheDocument();
    expect(screen.queryByText('Handsaw')).toBeInTheDocument();
    expect(screen.queryByText('A handsaw to saw some wood')).toBeInTheDocument();
  });

  it('Should search the tools by tags only', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    expect(screen.queryByText('Hammer')).toBeInTheDocument();
    expect(screen.queryByText('Screwdriver')).toBeInTheDocument();
    expect(screen.queryByText('Handsaw')).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox', 'search in tags only'));

    const searchField = screen.getByPlaceholderText('search by title or tag');
    userEvent.type(searchField, 'hammer');

    expect(screen.queryByText('Hammer')).not.toBeInTheDocument();
    expect(screen.queryByText('Screwdriver')).not.toBeInTheDocument();
    expect(screen.queryByText('Handsaw')).not.toBeInTheDocument();

    userEvent.clear(searchField);
    userEvent.type(searchField, 'smash');

    expect(screen.queryByText('Hammer')).toBeInTheDocument();
    expect(screen.queryByText('Screwdriver')).not.toBeInTheDocument();
    expect(screen.queryByText('Handsaw')).not.toBeInTheDocument();
  });
});
