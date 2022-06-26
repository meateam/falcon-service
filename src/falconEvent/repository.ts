import FalconEventModel from './model';
import { IFalconEventSchema } from './interface';

export default class FalconEventRepository {
    public static createFalconEvent = async (falconEvent: IFalconEventSchema): Promise<IFalconEventSchema> => {
        const result = await FalconEventModel.create(falconEvent);
        return result as IFalconEventSchema;
    };

    public static getAllFalconEvents = (): Promise<IFalconEventSchema[]> => {
        return FalconEventModel.find({}).exec();
    };

    public static deleteFalconEvent = async (fileId: string): Promise<IFalconEventSchema> => {
        const result = await FalconEventModel.findOneAndDelete({ fileId }).exec();
        if (!result) throw new Error('FalconEvent not found');
        return result;
    };
}
