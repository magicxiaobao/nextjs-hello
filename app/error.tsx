'use client'
import React from 'react'

interface Props {
    error: Error,
    reset: () => void
}

const ErrorPage = ({error, reset}: Props) => {
    console.log('Error', error)

    return (
        <>
            <div>服务开小差了</div>
            <button className="btn" onClick={() => reset()}>重试</button>
        </>
    )
}
export default ErrorPage
