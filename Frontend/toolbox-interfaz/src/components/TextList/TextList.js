import React from 'react'
import { Card } from 'react-bootstrap'

// Redux
import { useSelector } from 'react-redux'

function TextList() {

    const textList = useSelector(state => state.textList )

    return (
        <div className="row justify-content-center pb-5">
            <div className="col-8 pb-5">
                {
                    textList.map((text, index) =>
                        <Card className="my-2" key={index}>
                            <Card.Body className='p-2'>{text}</Card.Body>
                        </Card>
                    )
                }

            </div>
        </div>

    )
}

export default TextList