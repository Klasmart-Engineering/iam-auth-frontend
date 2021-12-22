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
type HistoryOptions = BrowserHistoryBuildOptions;
type HistoryLocation = History<LocationState>;

const extractPreviousQueryParams = (location: Location<unknown>) => {
    const queryString: string = location.search.length ? location.search : qs.extract(location.pathname);
    return qs.parse(queryString);
};

const preserveQueryParameters = (history: History, toPreserve: Set<string>): string => {
    const currentQuery = extractPreviousQueryParams(history.location);
    // currentQuery defaults to an empty object
    return Object.keys(currentQuery).length ?
        qs.stringify(Object.fromEntries(Object.entries(currentQuery)
            .filter(([param, value]) =>
                toPreserve.has(param) && value))) : ``;
};

const createLocationDescriptorObject = (location: LocationDescriptor, state?: LocationState): LocationDescriptorObject => {
    return typeof location === `string` ? {
        pathname: location,
        state,
    } : location;
};

 export const createPreserveQueryHistory = (createHistory: CreateHistory<HistoryOptions, HistoryLocation>,
    queryParameters: Set<string>): CreateHistory<HistoryOptions, HistoryLocation> => {
    return (options?: HistoryOptions) => {
        const history = createHistory(options);
        const { push: oldPush, replace: oldReplace } = history;
        history.push = (path: LocationDescriptor, state?: LocationState) => {
            const locationDescriptorObject = createLocationDescriptorObject(path, state);
            const searchQuery = preserveQueryParameters(history, queryParameters);
            locationDescriptorObject.search = searchQuery !== `` ? searchQuery : locationDescriptorObject.search;
            return oldPush.apply(history, [locationDescriptorObject]);
        };
        history.replace = (path: LocationDescriptor, state?: LocationState) => {
            const locationDescriptorObject = createLocationDescriptorObject(path, state);
            const searchQuery = preserveQueryParameters(history, queryParameters);
            locationDescriptorObject.search = searchQuery !== `` ? searchQuery : locationDescriptorObject.search;
            return oldReplace.apply(history, [locationDescriptorObject]);
        };
        return history;
    };
};

export const history = createPreserveQueryHistory(createBrowserHistory, new Set<string>([`continue`]))();
