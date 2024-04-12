import { _PATH_FRONTEND } from "../../path/path-frontend";

export const ROOT = (path: string) => `${_PATH_FRONTEND.dashboard.root}/${path}`;

export const TABLE = (section: string) => ROOT(`table/${section}`);
export const POSTS = (section: string) => ROOT(`posts/${section}`);
