// Admin data access. Routes every call to the real database, or to the in-memory
// sample data while the admin is in demo mode.
import * as api from '../lib/api';
import { demo } from './demo';

let demoMode = false;

export const setDemoMode = (on) => {
    demoMode = on;
};

const route =
    (name) =>
    (...args) =>
        (demoMode ? demo[name] : api[name])(...args);

export const getMyRole = route('getMyRole');

export const listClients = route('listClients');
export const getClient = route('getClient');
export const addClient = route('addClient');
export const updateClient = route('updateClient');
export const deleteClient = route('deleteClient');

export const listProjects = route('listProjects');
export const getProject = route('getProject');
export const saveProject = route('saveProject');
export const deleteProject = route('deleteProject');
export const uploadProjectImage = route('uploadProjectImage');

export const listStaff = route('listStaff');
export const saveStaff = route('saveStaff');
export const deleteStaff = route('deleteStaff');
