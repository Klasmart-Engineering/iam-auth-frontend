import {
    BrowserHistoryBuildOptions,
    createBrowserHistory,
    History,
    LocationDescriptor,
    LocationDescriptorObject,
} from 'history';

type LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;
type HistoryOptions = BrowserHistoryBuildOptions;
type HistoryLocation = History<LocationState>;

const preserveQueryParameters = (history: History, toPreserve: Set<string>): string => {
    const params = [...new URLSearchParams(history.location.search.length ? history.location.search : history.location.pathname).entries()];

    return (new URLSearchParams(params.filter(([key, value]) => [value, toPreserve.has(key)].every(Boolean)))).toString();
};

const createLocationDescriptorObject = (location: LocationDescriptor, state?: LocationState): LocationDescriptorObject => {
    return typeof location === `string` ? {
        pathname: location,
        state,
    } : location;
};

export const createPreserveQueryHistory = (createHistory: CreateHistory<HistoryOptions, HistoryLocation>, queryParameters: Set<string>): CreateHistory<HistoryOptions, HistoryLocation> => {
    return (options?: HistoryOptions) => {
        const history = createHistory(options);
        const { push: oldPush, replace: oldReplace } = history;

        history.push = (path: LocationDescriptor, state?: LocationState) => {
            const locationDescriptorObject = createLocationDescriptorObject(path, state);
            const searchQuery = preserveQueryParameters(history, queryParameters);

            locationDescriptorObject.search = searchQuery !== `` ? searchQuery : locationDescriptorObject.search;

            return oldPush.apply(history, [ locationDescriptorObject ]);
        };

        history.replace = (path: LocationDescriptor, state?: LocationState) => {
            const locationDescriptorObject = createLocationDescriptorObject(path, state);
            const searchQuery = preserveQueryParameters(history, queryParameters);

            locationDescriptorObject.search = searchQuery !== `` ? searchQuery : locationDescriptorObject.search;

            return oldReplace.apply(history, [ locationDescriptorObject ]);
        };

        return history;
    };
};

export const history = createPreserveQueryHistory(createBrowserHistory, new Set<string>([ `continue`, `ua` ]))();
