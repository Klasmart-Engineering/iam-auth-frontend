import {
    BrowserHistoryBuildOptions,
    createBrowserHistory,
    History,
    Location,
    LocationDescriptor,
    LocationDescriptorObject,
} from 'history';
import qs from 'query-string';

type LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;
type O = BrowserHistoryBuildOptions;
type H = History<LocationState>;

/**
 * Extract QueryParams from the result of either:
 *  - `history.push("/some-path?my-param=x") => history.location.search will be an empty string, and the QueryParam is embedded in history.location.pathname
 *  - `history.push({pathname: "/some-path", search: "?my-param=x"}) => history.location.search contains the QueryParam
 */
const extractPreviousQueryParams = (location: Location<unknown>) => {
    const queryString: string = location.search.length ? location.search : qs.extract(location.pathname);
    return qs.parse(queryString);
};

const preserveQueryParameters = (history: History, toPreserve: Set<string>, location: LocationDescriptorObject): LocationDescriptorObject => {
    const currentQuery = extractPreviousQueryParams(history.location);
    // currentQuery defaults to an empty object
    if (Object.keys(currentQuery).length) {
        const newQueryParams = Object.fromEntries(Object.entries(currentQuery).filter(([ param, value ]) => toPreserve.has(param) && value));
        location.search = qs.stringify(newQueryParams);
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
