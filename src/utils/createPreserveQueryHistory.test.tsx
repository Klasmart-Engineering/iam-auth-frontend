
import { createPreserveQueryHistory } from './createPreserveQueryHistory';
import { createBrowserHistory } from 'history';

describe(`createPreserveQueryHistory`, () => {
    describe(`QueryParam selected for preservation is copied from the previous history.location`, () => {
        it(`when using history.push('/path?param=x') syntax`, () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set([ `continue` ]))();
            history.push(`/hello?continue=world`);

            history.push(`/goodbye`);

            expect(history.location.search).toEqual(`?continue=world`);
        });

        it(`when using history.push({pathname: "/path", search="?param=x"}) syntax`, () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set([ `continue` ]))();
            history.push({
                pathname: `/hello`,
                search: `?continue=world`,
            });

            history.push(`/goodbye`);

            expect(history.location.search).toEqual(`?continue=world`);
        });
    });
});
