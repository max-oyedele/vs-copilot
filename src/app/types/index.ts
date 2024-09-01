export enum ActionStatus {
  CREATED = "Created",
  UPDATED = "Updated",
  DELETED = "Deleted",
  MOVED = "Moved",
}

export interface IModule {
  name: string;
  status: ActionStatus;
}

export interface IFeature {
  name: string;
  status: ActionStatus;
}
