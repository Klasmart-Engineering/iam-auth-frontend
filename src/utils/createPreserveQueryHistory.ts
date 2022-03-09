import {
    BrowserHistoryBuildOptions,
    createBrowserHistory,
    History,
    LocationDescriptor,
    LocationDescriptorObject,
} from 'history';
import { pick } from 'lodash-es';
import qs from 'query-string';

type LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;
type HistoryOptions = BrowserHistoryBuildOptions;
type HistoryLocation = History<LocationState>;

const parsePath = (path: string): LocationDescriptorObject => {
    // Need to specify 2nd `base` argument as path will be a relative URL
    return pick(new URL(path, window.location.origin), [
        `pathname`,
        `search`,
        `hash`,
    ]);
};

const preserveQueryParameters = (history: History, toPreserve: Set<string>, location: LocationDescriptorObject): LocationDescriptorObject => {
    const currentQuery = qs.parse(history.location.search);
    if (!Object.keys(currentQuery).length) {
        return location;
    }

    const preservedQuery: Record<string, unknown> = {};
    for (const p of toPreserve) {
        const v = currentQuery[p];
        if (v) {
            preservedQuery[p] = v;
        }
    }
    if (location.search) {
        Object.assign(preservedQuery, qs.parse(location.search));
    }
    location.search = qs.stringify(preservedQuery);
    return location;
};

// Port of https://github.com/remix-run/history/blob/3e9dab413f4eda8d6bce565388c5ddb7aeff9f7e/packages/history/index.ts#L447
// Modified as we don't need to set the `key` property
const normalizeLocation = (to: LocationDescriptor, state?: LocationState): LocationDescriptorObject => {
    return {
        pathname: location.pathname,
        hash: ``,
        search: ``,
        // 2nd argument `state` is overridden if location-like object is passed as 1st argument
        state,
        ...(typeof to === `string` ? parsePath(to): to),
    };
};

export const createPreserveQueryHistory = (createHistory: CreateHistory<HistoryOptions, HistoryLocation>,
    toPreserve: Set<string>): CreateHistory<HistoryOptions, HistoryLocation> => {
    return (options?: HistoryOptions) => {
        const history = createHistory(options);
        const { push: oldPush, replace: oldReplace } = history;
        history.push = (path: LocationDescriptor, state?: LocationState) => {
            return oldPush.apply(history, [ preserveQueryParameters(history, toPreserve, normalizeLocation(path, state)) ]);
        };
        history.replace = (path: LocationDescriptor, state?: LocationState) => {
            return oldReplace.apply(history, [ preserveQueryParameters(history, toPreserve, normalizeLocation(path, state)) ]);
        };
        return history;
    };
};

export const history = createPreserveQueryHistory(createBrowserHistory, new Set<string>([ `continue`, `ua` ]))();
