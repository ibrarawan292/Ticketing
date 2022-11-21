import React, { useEffect } from 'react'
const SetGetInput = (props) =>{
    useEffect(() => {
        props.setData(props.name)
      }, [props.status])
      const oldValue = props.name;
      console.log(props.status)
    return(
        <>
             <input
                type={props.type}
                id={props.name}
                name={props.name1}
                value={props.data}
                min="1" max="5"
                onChange={(e) => {
                    props.setData(e.target.value)
                }}
                className="p-2 mt-1 mb-5 w-full text-sm border rounded-md"
                placeholder={props.placeholder}
                required
            />
        </>
    )
}
export default SetGetInput;

// const [planNameEdit, setPlanNameEdit] = useState("")
//   const [qAvailableEdit, setQavailableEdit] = useState("")
//   const [sDaysEdit, setSdaysEdit] = useState("")
//   const [priceEdit, setPriceEdit] = useState("")
//   const [statusPEdit, setStatusPEdit] = useState("")