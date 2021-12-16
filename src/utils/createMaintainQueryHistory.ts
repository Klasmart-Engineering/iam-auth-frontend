import {
    History,
    LocationDescriptor,
    LocationDescriptorObject
} from 'history';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;

const maintainQueryParameters = (history: History, preserveList: string[], location: LocationDescriptorObject): LocationDescriptorObject => {
    const currentQuery = queryString.parse(history.location.search);
    if (currentQuery) {
        const preservedQuery: { [key: string]: string | Array<string> } = {};
        for (const preserve of preserveList) {
            const link = currentQuery[preserve];
            if (link) {
                preservedQuery[preserve] = link;
            }
        }
        if (location.search) {
            Object.assign(preservedQuery, queryString.parse(location.search));
        }
        location.search = queryString.stringify(preservedQuery);
    }
    return location;
};

const createLocationDescriptorObject = (location: LocationDescriptor, state?: LocationState): LocationDescriptorObject => {
    return typeof location === 'string' ? { pathname: location, state } : location;
};

export const createMaintainQueryHistory = (createHistory: CreateHistory<O, H>,
    queryParameters: string[]): CreateHistory<O, H> => {
    return (options?: O) => {
        const history = createHistory(options);
        const { push:oldPush, replace: oldReplace } = history;
        history.push = (path: LocationDescriptor, state?: LocationState) =>
            oldPush.apply(history, [maintainQueryParameters(history, queryParameters, createLocationDescriptorObject(path, state))]);
        history.replace = (path: LocationDescriptor, state?: LocationState) =>
            oldReplace.apply(history, [maintainQueryParameters(history, queryParameters, createLocationDescriptorObject(path, state))]);
        return history;
    }
};

export const history = createMaintainQueryHistory(createBrowserHistory, ['continue'])();