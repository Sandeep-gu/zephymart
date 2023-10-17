import React from 'react'

function CategoryForm({handleSubmitbtn,item,setItem}) {
  return (
    <div>
        <form onSubmit={(e)=>handleSubmitbtn(e)}>
            <input className='form-control my-2' type="text" value={item} onChange = {(e)=>setItem(e.target.value)} placeholder="Enter category"/>
            <input className='btn btn-primary' type="submit" placeholder="Submit"/>
        </form>
    </div>
  )
}

export default CategoryForm