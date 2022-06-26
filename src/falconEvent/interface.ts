export enum FalconEventType {
    FILE_DELETE = 'FILE_DELETE',
}

export interface IFalconEventSchema {
    fileId: string;
    eventType: FalconEventType;
}
