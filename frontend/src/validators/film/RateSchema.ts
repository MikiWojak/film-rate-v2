import { object, number } from 'yup';

const RateSchema = object({
    rate: number().required().integer().min(1).max(10)
});

export default RateSchema;
