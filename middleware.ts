
export {default} from 'next-auth/middleware'


export const config = {
    // * means zero or more
    // + means one or more
    // ? means zero or one
    matcher: ['/dashboard/:param*']
}
