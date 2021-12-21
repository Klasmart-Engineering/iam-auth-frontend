
import { createPreserveQueryHistory } from './createPreserveQueryHistory';
import { createBrowserHistory } from 'history';

describe(`createPreserveQueryHistory`, () => {
    const history = createPreserveQueryHistory(createBrowserHistory, new Set<string>(['continue']))();
    test(`history points to default location`, () => {
        expect(history.location.pathname).toEqual(`/`);
    });

    test(`search is empty`, () => {
        expect(history.location.search).toEqual(``);
    });

    test(`push is valid function`, () => {
        expect(history.push).toEqual(expect.any(Function));
    });

    test(`pathname is valid after pushing new route`, () => {
        history.push({
            pathname: `/continue`,
            search: `?test`,
        });
        expect(history.location.pathname).toEqual('/continue');
  });
});
