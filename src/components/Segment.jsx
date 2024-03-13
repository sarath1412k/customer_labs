import React, { useEffect, useState } from 'react'
import './Segment.css'
import PopUpModal from './PopUpModal'
import { IoIosRemove } from "react-icons/io";
import axios from 'axios';

const Segment = () => {
    
    const [show,setShow] = useState(false)
    const [segment,setSegment] = useState({segment_name:''})
    const [schemaValue,setSchemaValue] = useState('')
    const [selectedSchema,setSelectedSchema] = useState({})
    const [choosenSchema,setChoosenSchema] = useState({})
    const [schemaList,setSchemaList] = useState([])
    const [schema,setSchema] = useState([])

    const [filteredOptions,setFilteredOptions] = useState ([])


    const schemaOptions = [
        { label: 'First Name', value: 'first_name',userTraits:true },
        { label: 'Last Name', value: 'last_name',userTraits:true },
        { label: 'Gender', value: 'gender',userTraits: false },
        { label: 'Age', value: 'age',userTraits: false },
        { label: 'Account Name', value: 'account_name',userTraits: true },
        { label: 'City', value: 'city',userTraits: false },
        { label: 'State', value: 'state',userTraits: false },
    ];
    

    //filter the not selected schemas
    useEffect(() => {
        let filteredItems = schemaOptions.filter(option =>   !schema.some(item => Object.values(item)[0] === option.value)   );
        setFilteredOptions(filteredItems)
    },[schemaList])
    
   //  
    const handleInputs = ({target}) => {
        let name = target.name;
        let value = target.value
        setSegment(prev => ({...prev,[name]:value}))
    }

    // function for remove schema
    const removeSchema = (index) => { 
        const removedList = schemaList.filter((e,i) => i !== index)
        setSchemaList(removedList)
    }
    //function to change schema
    const changeSchema = (index,target) => {
        let value = target.value
        let selectedOption = schemaOptions.find(data => data.value === value)
        console.log(selectedOption)
        const updatedItems = [...schemaList.slice(0, index), selectedOption, ...schemaList.slice(index + 1)];
          setSchemaList(updatedItems)
          let schemaObject = {[selectedOption.label]:selectedOption.value}
          const updatedSchema = [...schema.slice(0, index), schemaObject, ...schema.slice(index + 1)];
          setSchema(updatedSchema)
    }
    //function to select the schema
    const selectShema = ({target}) => {
        let value = target.value
        setSchemaValue(value)
        let selectedOption = schemaOptions.find(data => data.value === value)
        setChoosenSchema(selectedOption)
        let schemaObject = {[selectedOption.label]:selectedOption.value}        
        setSelectedSchema(schemaObject)
    }

    const addSchemaFunc = () => {
        if(schemaValue !== ''){
            let items = [...schema,selectedSchema]
            let listItems = [...schemaList,choosenSchema]
    
            setSchemaList(listItems)
            setSchema(items)
            setSchemaValue('')
            setSelectedSchema({})
            setChoosenSchema({})
        }
        else{
            alert('select the schema')
        }
   
    }
    //post the data webhook server
    const funcSave = () => {
        if(segment.segment_name.trim() !== '' && schema.length > 1){
            let data = {segment,schema:schema}
            axios.post(`https://webhook.site/33de906a-962e-4673-8152-36aebc05fe66`,data,
            {
                headers:{'content-type':'application/json'}
            })
            .then(res => {
                console.log(res)
                func_cancel()
                alert('data saved successfullt')
            })
            .catch((err) => {
                console.log(err.response)
            })
        }
        else{
            if(segment.segment_name.trim() === ''){
                alert('Please enter the Segment name')
            }
            if(schema.length < 1){
                alert('Please add the schema')
            }
        }      
    }

    const func_cancel = () => {
        setShow(false)
        setSelectedSchema({})
        setChoosenSchema({})
        setSegment({segment_name:''})
        setSchema([])
        setSchemaList([])
        setFilteredOptions([])
    }


  return (
    <div className='container'>
    <div className='seg-header'>
        <span>View Audience</span>
    </div>
     <button className='seg-save-btn' onClick={() => setShow(true)}>Save Segment</button>
     <PopUpModal show={show} handleClose={() => setShow(false)} >
    <div className='popup-container'>
     <div className='seg-header'>
        <span>View Audience</span>
    </div>
    <form className='segment-form' >
        <label className='seg-info'>Enter the Name of the Segment</label>
        <input className='seg-name' name='segment_name' type='text' placeholder='Name of the segment' onChange={handleInputs} value={segment.segment_name}/>
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
            {schemaList.map((data,index) => {
                return(
                    <div key={index} className="schema-element">
                    {data.userTraits
                     ? <div className='user-traits-color'></div> 
                     : <div className='group-traits-color'></div> }
                      <select className='selected-schema' onChange={({target}) => changeSchema(index,target)} value={data.value} >
                        <option label={data.label}>{data.value}</option>
                           {filteredOptions.map((schema,i) => (
                      <option key={i} value={schema.value}>
                        {schema.label}
                      </option>
                    ))}
                    </select>
                    <IoIosRemove className='remove-schema-btn' title='remove schema' onClick={() => removeSchema(index)} />
                    </div>
                )
            })}
     
      
        </div>
        <div className="schema-add-container">
        <div className="schema-element">
        <div className='default-traits-color'></div>
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
            <button className='cancel-btn' onClick={func_cancel}>Cancel</button>
    </div>
    </div>
     </PopUpModal>
    </div>
 
  )
}

export default Segment