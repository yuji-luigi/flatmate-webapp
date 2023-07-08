import { render, screen } from '@testing-library/react';
import DashboardHomePage from '../pages/dashboard/home/index';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      // Add any other router values needed by your test
    };
  },
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home', () => {
  it('renders a heading', () => {
    const initialState = {
      reduxdb: {},
      status: 'idle',
      submitting: false,
      error: null,
      message: null,
    };
    const store = mockStore({
      crud: initialState,
    });
    render(
      <Provider store={store}>
        <DashboardHomePage />
      </Provider>
    );
    const heading = screen.getByRole('heading', { name: /Maintainers/i });
    expect(heading).toBeInTheDocument();
  });
});
