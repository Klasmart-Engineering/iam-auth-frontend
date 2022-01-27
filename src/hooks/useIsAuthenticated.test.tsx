import useIsAuthenticated,
{ initialState } from '@/hooks/useIsAuthenticated';
import { renderHook } from '@testing-library/react-hooks';

describe(`useIsAuthenticated`, () => {
    beforeAll(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    test(`returns isLoading state if API call is in progress`, async () => {
        const { result, waitForNextUpdate } = renderHook(() => useIsAuthenticated());

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(result.current).toEqual(initialState);

        // Wait for fetch to complete, to avoid `not wrapped in act` warning
        await waitForNextUpdate();
    });

    test(`returns isAuthenticated=true if API call has 200 response`, async () => {
        const { result, waitForNextUpdate } = renderHook(() => useIsAuthenticated());

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(result.current).toEqual(initialState);

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isLoading: false,
            isAuthenticated: true,
        });
    });

    test(`returns isAuthenticated=false if API call returns non-200 response`, async () => {
        (global.fetch as jest.MockedFunction<typeof global.fetch>).mockResolvedValueOnce({
            ok: false,
        } as Response);
        const { result, waitForNextUpdate } = renderHook(() => useIsAuthenticated());

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(result.current).toEqual(initialState);

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isLoading: false,
            isAuthenticated: false,
        });
    });

    test(`returns isAuthenticated=false if API call throws an error`, async () => {
        (global.fetch as jest.MockedFunction<typeof global.fetch>).mockImplementationOnce(() => {throw new Error(`Some network error`);});
        const { result, waitForNextUpdate } = renderHook(() => useIsAuthenticated());

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(result.current).toEqual(initialState);

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isLoading: false,
            isAuthenticated: false,
        });
    });
});
