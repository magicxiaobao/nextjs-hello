import React from 'react'
import {Html, Body, Container, Tailwind, Text, Preview, Link} from '@react-email/components'

interface Props {
    name: string
}

const WelcomeTemplate = ({name}: Props) => {
    return (
        <Html>
            <Tailwind>
                <Body className='bg-white'>
                    <Container>
                        <Text className='font-bold text-3xl'>Hello {name}</Text>
                        <Link href='https://www.baidu.com'>www.baidu.com</Link>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
export default WelcomeTemplate
