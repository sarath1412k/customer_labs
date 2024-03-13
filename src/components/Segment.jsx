import React, { useState } from 'react'
import './Segment.css'
import PopUpModal from './PopUpModal'
import { IoIosRemove } from "react-icons/io";

const Segment = () => {
    
    const [segment,setSegment] = useState({segment_name:''})
    const [schemaValue,setSchemaValue] = useState('')
    const [selectedSchema,setSelectedSchema] = useState({})
    const [schema,setSchema] = useState([])


    const schemaOptions = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ];

    const handleInputs = ({target}) => {
        setSegment(target.value)
    }
    
    const selectShema = ({target}) => {
        let value = target.value
        let selectedOption = schemaOptions.find(data => data.value === value)
        setSchemaValue(value)
        setSelectedSchema(selectedOption)
    }

    const addSchemaFunc = () => {
        console.log(selectedSchema)
        let items = [...schema,selectedSchema]
        console.log(items)
        setSchema(items)
    }

    const funcSave = () => {
        console.log(schema)
    }

  return (
    <div className='container'>
    <div className='seg-header'>
        <span>View Audience</span>
    </div>
     <button className='seg-save-btn'>Save Segment</button>
     <PopUpModal >
    <div className='popup-container'>
     <div className='seg-header'>
        <span>View Audience</span>
    </div>
    <form className='segment-form' >
        <label className='seg-info'>Enter the Name of the Segment</label>
        <input className='seg-name' name='segment_name' type='text' onChange={handleInputs} value={segment.segment_name}/>
        <p className='seg-info'>To save your segment, you need to add the schemas to build the query</p>
        <div className='traits-container'>
                <div className='traits-classify'>
                    <div className='user-traits-color'></div>
                    <div className='ut-label'> - User Traits</div>
                </div>
                <div className='traits-classify'>
                    <div className='group-traits-color'></div>
                    <div className='ut-label'> - Group Traits</div>
                </div>
        </div>
        <div className="schema-container">
            {/* <div className="schema-element">
            <div className='user-traits-color'></div>
              <select className='selected-schema'>
                   {schemaOptions.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
            </select>
            <IoIosRemove className='remove-schema-btn' title='remove schema' />
            </div> */}
      
        </div>
        <div className="schema-add-container">
        <div className="schema-element">
        <div className='user-traits-color'></div>
            <select className='selected-schema' name='schema' onChange={selectShema} value={schemaValue}>
                <option style={{display:'none'}} value='' >Add schema to segment</option>
                   {schemaOptions.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
            </select>    
        </div>
        <div className='add-schema-link' onClick={addSchemaFunc}><span>+</span><span className='add-schema-link-label'>Add new schema</span></div>
        </div>         
    </form>
    <div className='btn-group'>
            <button  className='save-btn' onClick={funcSave}>Save the Segment</button>
            <button className='cancel-btn'>Cancel</button>
    </div>
    </div>
     </PopUpModal>
    </div>
 
  )
}

export default Segment