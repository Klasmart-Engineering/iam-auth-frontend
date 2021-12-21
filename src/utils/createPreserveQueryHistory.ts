import {
    BrowserHistoryBuildOptions,
    createBrowserHistory,
    History,
    LocationDescriptor,
    LocationDescriptorObject,
} from 'history';
import queryString from 'query-string';

type LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;
type O = BrowserHistoryBuildOptions;
type H = History<LocationState>;

const preserveQueryParameters = (history: History, toPreserve: Set<string>, location: LocationDescriptorObject): LocationDescriptorObject => {
    const currentQuery = queryString.parse(history.location.search);
    if (currentQuery) {
        const newQueryParams = Object.fromEntries(Object.entries(currentQuery).filter(([ param, value ]) => toPreserve.has(param) && value));
        location.search = queryString.stringify(newQueryParams);
    }
    return location;
};

const createLocationDescriptorObject = (location: LocationDescriptor, state?: LocationState): LocationDescriptorObject => {
    return typeof location === `string` ? {
        pathname: location,
        state,
    } : location;
};

export const createPreserveQueryHistory = (createHistory: CreateHistory<O, H>,
    queryParameters: Set<string>): CreateHistory<O, H> => {
    return (options?: O) => {
        const history = createHistory(options);
        const { push:oldPush, replace: oldReplace } = history;
        history.push = (path: LocationDescriptor, state?: LocationState) =>
            oldPush.apply(history, [ preserveQueryParameters(history, queryParameters, createLocationDescriptorObject(path, state)) ]);
        history.replace = (path: LocationDescriptor, state?: LocationState) =>
            oldReplace.apply(history, [ preserveQueryParameters(history, queryParameters, createLocationDescriptorObject(path, state)) ]);
        return history;
    };
};

export const history = createPreserveQueryHistory(createBrowserHistory, new Set<string>([ `continue` ]))();
