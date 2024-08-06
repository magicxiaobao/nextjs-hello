import {z} from 'zod'

export default z.object({
     name: z.string().min(3)
})
