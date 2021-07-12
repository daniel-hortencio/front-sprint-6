export type RouteTypes = {
    path?: string | undefined;
    exact?: boolean | undefined;
    isPrivate?: boolean;
    component: React.FC;
}