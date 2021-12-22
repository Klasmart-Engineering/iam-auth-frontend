
import { createPreserveQueryHistory } from './createPreserveQueryHistory';
import { createBrowserHistory } from 'history';

describe('createPreserveQueryHistory push', () => {

    describe("when using history.push('/path?param=x&param=y) syntax", () => {
        it('QueryParam selected for preservation is copied from the previous history.location', async () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set(['continues']))();

            history.push({
                pathname:'/hellos',
                search: '?name=bob&continues=john',
            });
            history.push('/hello-again');

            expect(history.location.search).toEqual('?continues=john');
        });
    });


    describe("when using history.push('/path?param=x') syntax", () => {
        it('QueryParam selected for preservation is copied from the previous history.location', () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set(['continue']))();

            history.push('/hello?continue=world');

            history.push('/goodbye');

            expect(history.location.search).toEqual('?continue=world');
        });
    });

    describe("when using history.push({pathname: '/path', search='?param=x'}) syntax", () => {
        it('QueryParam selected for preservation is copied from the previous history.location', () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set(['continue']))();

            history.push({
                pathname: '/hello',
                search: '?continue=world',
            });

            history.push('/goodbye');

            expect(history.location.search).toEqual('?continue=world');
        });
    })

});

describe('createPreserveQueryHistory replace', () => {

    describe("when using history.replace('/path?param=x') syntax", () => {
        it('QueryParam selected for preservation is copied from the previous history.location', () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set(['continue1']))();

            history.replace({
                pathname: '/hello',
                search: '?name=bob&continue1=john',
            });
            history.replace('/hello-again');

            expect(history.location.search).toEqual('?continue1=john');
        });
    });

    describe("when using history.replace('/path?param=x') and history.push('/path') syntax", () => {
        it('QueryParam selected for preservation is copied from the previous history.location', () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set(['continue2']))();

            history.replace({
                pathname: '/hello',
                search: '?continue2=john',
            });
            history.push('/hello-again');

            expect(history.location.search).toEqual('?continue2=john');
        });
    });

    describe("when using history.push('/path?param=x') and history.replace('/path') syntax", () => {
        it('QueryParam selected for preservation is copied from the previous history.location', () => {
            const history = createPreserveQueryHistory(createBrowserHistory, new Set(["continue3"]))();

            history.push({
                pathname: '/hello',
                search: '?continue3=john',
            });

            history.replace('/hello-again');

            expect(history.location.search).toEqual('?continue3=john');
        });
    });
})