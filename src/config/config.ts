export const PROD_REMOTE_API = 'http://134.0.112.54'

export const createApi = (endpoint: string): string => PROD_REMOTE_API + `/${endpoint}`;

export const API_URLS = {
    audio: createApi('audio')
}

