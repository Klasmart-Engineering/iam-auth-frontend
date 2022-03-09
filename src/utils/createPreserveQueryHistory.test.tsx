
import { createPreserveQueryHistory } from './createPreserveQueryHistory';
import { createBrowserHistory } from 'history';

describe(`createPreserveQueryHistory`, () => {
    const createHistory = () => {
        return createPreserveQueryHistory(createBrowserHistory, new Set([ `continue` ]))();
    };

    beforeEach(() => {
        // Reset history
        window.history.replaceState(null, ``, `/`);
    });

    // NB: require casting as string literals to override default `string` type, which throws a TS error
    // when you try `history[action]`
    describe.each([ `push` as `push`, `replace` as `replace` ])(`#%s`, (action: `push` | `replace`) => {

        describe(`when using a location object`, () => {
            describe(`without a preserved QueryParam`, () => {
                it(`should have an empty 'search' field`, () => {
                    const history = createHistory();

                    history.push(`/hello`);
                    history[action]({
                        pathname: `/goodbye`,
                    });

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(``);
                });
            });

            describe(`with no other QueryParams`, () => {
                it(`should add the preserved QueryParam`, () => {
                    const history = createHistory();

                    history.push(`/hello?continue=x`);
                    history[action]({
                        pathname: `/goodbye`,
                    });

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?continue=x`);
                });
            });

            describe(`with an unpreserved QueryParam`, () => {
                it(`should add the preserved QueryParam, and the other QueryParam`, () => {
                    const history = createHistory();

                    history.push(`/hello?continue=x`);
                    history[action]({
                        pathname: `/goodbye`,
                        search: `?another=y`,
                    });

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?another=y&continue=x`);
                });
            });

            describe(`with a hash fragment`, () => {
                it(`should add the preserved QueryParam, and the hash`, () => {
                    const history = createHistory();

                    history.push(`/hello?continue=x`);
                    history[action]({
                        pathname: `/goodbye`,
                        hash: `#foo`,
                    });

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?continue=x`);
                    expect(history.location.hash).toEqual(`#foo`);
                });
            });

            describe(`with state`, () => {
                it(`should add the preserved QueryParam, and the state`, () => {
                    const history = createHistory();

                    const state = {
                        foo: `bar`,
                    };
                    history.push(`/hello?continue=x`);
                    history[action]({
                        pathname: `/goodbye`,
                        state,
                    });

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?continue=x`);
                    expect(history.location.state).toEqual(state);
                });
            });

        });

        describe(`when using a path string`, () => {
            describe(`without a preserved QueryParam`, () => {
                it(`should have an empty 'search' field`, () => {
                    const history = createHistory();

                    history.push(`/hello`);
                    history[action](`/goodbye`);

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(``);
                });
            });

            describe(`with no other QueryParams`, () => {
                it(`should add the preserved QueryParam`, () => {
                    const history = createHistory();

                    history.push(`/hello?continue=x`);
                    history[action](`/goodbye`);

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?continue=x`);
                });
            });

            describe(`with an unpreserved QueryParam`, () => {
                it(`should add the preserved QueryParam, and the other QueryParam`, () => {
                    const history = createHistory();

                    history.push(`/hello?continue=x`);
                    history[action](`/goodbye?another=y`);

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?another=y&continue=x`);
                });
            });

            describe(`with a hash fragment`, () => {
                it(`should add the preserved QueryParam, and the hash`, () => {
                    const history = createHistory();

                    history.push(`/hello?continue=x`);
                    history[action](`/goodbye#foo`);

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?continue=x`);
                    expect(history.location.hash).toEqual(`#foo`);
                });
            });

            describe(`with state`, () => {
                it(`should add the preserved QueryParam, and the state`, () => {
                    const history = createHistory();

                    const state = {
                        foo: `bar`,
                    };
                    history.push(`/hello?continue=x`);
                    history[action](`/goodbye`, state);

                    expect(history.location.pathname).toEqual(`/goodbye`);
                    expect(history.location.search).toEqual(`?continue=x`);
                    expect(history.location.state).toEqual(state);
                });
            });
        });
    });
});
