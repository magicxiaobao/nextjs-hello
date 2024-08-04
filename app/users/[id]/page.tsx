import React from 'react'
import {notFound} from "next/navigation";

interface Props {
    params: {
        id: number
    }
}

const PageDetail = ({params: {id}}: Props) => {
    if (id > 10) {
        notFound()
    }
    return (
        <div>PageDetail{id}</div>
    );
}
export default PageDetail
