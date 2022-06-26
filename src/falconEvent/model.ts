import * as mongoose from 'mongoose';

import { config } from '../config';
import { IFalconEventSchema, FalconEventType } from './interface';

const FalconEventSchema = new mongoose.Schema<IFalconEventSchema & mongoose.Document>(
    {
        fileId: {
            type: String,
            required: true,
            unique: true,
        },
        eventType: {
            type: String,
            default: FalconEventType.FILE_DELETE,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
FalconEventSchema.index({ fileId: 1 });

const FlaconEventModel = mongoose.model<IFalconEventSchema & mongoose.Document>(
    config.mongo.falconEventsCollection,
    FalconEventSchema,
);
export default FlaconEventModel;
