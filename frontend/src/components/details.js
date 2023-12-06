import { useContext, useState } from "react"
import '../styles/details.css';
import { appContext } from "./App";

export const Details = ({item, setItem}) => {
  const {userData, navigate} = useContext(appContext)
  const [isEditing, setIsEditing] = useState(false);
  const [itemEdits, setItemEdits] = useState({...item})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemEdits({
      ...itemEdits,
      [name]: value,
    });
  };

  const showEditButtons = () => {
    if (item.user_id === userData.id){
      return (
        <div className="edit-buttons">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteItem}>Delete Item</button>
        </div> 
      )
    } else return ''
  }

  const deleteItem = () => {
    fetch('http://localhost:8080/item', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id: item.id})
    }).then(res => {
        setItem(null)
        navigate('/profile')
      })
  }

  const updateItem = () => {
    fetch('http://localhost:8080/item', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(itemEdits)
    }).then(res => {
      setItem(null)
      })
  }


  return (
    isEditing ? 
    <>
      {item ?
      <div className="details-container">
        <form className="details-head">
          <div>
            <label>Title </label>
            <input type="text" name="item_name" value={itemEdits.item_name} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Quantity </label>
            <input type="number" name="quantity" value={itemEdits.quantity} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Description </label>
            <input className="description-input" type="text" name="description" value={itemEdits.description} onChange={handleInputChange}/>
          </div>
        </form>
        <div className="edit-buttons">
          <button onClick={updateItem}>Save</button>
          <button onClick={() => {
            setItemEdits({...item}) 
            setIsEditing(false)
            }}>Cancel</button>
        </div>
      </div>
      : ''}
    </>
    :
    <>
      {item ?
      <div className="details-container">
        <div className="details-head">
          <h2>{item.item_name}</h2>
          <button className="close-details-button" onClick={() => setItem(null)}>x</button>
        </div>
        <div className="details-desc">
          <span>Quantity: {item.quantity}</span>
          <p>{item.description}</p>
        </div>
        {userData ? showEditButtons():''}
      </div>
      : ''}
    </>
  )
}