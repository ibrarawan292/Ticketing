import React, { useEffect } from 'react'
const SetGetInput = (props) =>{
    useEffect(() => {
        props.setData(props.name)
      }, [props.status])
      const oldValue = props.name;
    return(
        <>
             <textarea
                value={props.data}
                onChange={(e) => {
                    props.setData(e.target.value)
                }}
                className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                style={{height:"100px"}}
                placeholder={props.placeholder}
                required
            ></textarea>
        </>
    )
}
export default SetGetInput;