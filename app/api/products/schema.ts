import {z} from 'zod';

export default z.object({
    name: z.string().min(3),
    price: z.number().int().positive().min(1).max(20000)
})
