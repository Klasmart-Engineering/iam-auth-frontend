
import { createMaintainQueryHistory } from './createMaintainQueryHistory';
import { createBrowserHistory } from 'history';

describe(`createMaintainQueryHistory`, () => {
    const history = createMaintainQueryHistory(createBrowserHistory, [ `continue` ])();
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
