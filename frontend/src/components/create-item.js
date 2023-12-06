import { useContext, useState } from "react";
import { appContext } from "./App";


export const CreateItem = () => {
  const {userData, navigate} = useContext(appContext);
  const [formDataMissing, setFormDataMissing] = useState(false);
  const [formData, setFormData] = useState({
    user_id: userData.id,
    item_name: '',
    description: '',
    quantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {user_id, item_name, description, quantity} = formData
    // eslint-disable-next-line
    if (user_id, item_name, description, quantity) {
      postItem();
    } else {
      setFormDataMissing(true)
    }
  }

  const postItem = () => {
    fetch('http://localhost:8080/create', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(formData)
    }).then(res => navigate('/profile'))
  }

  return (
    <div className="create-container">
      <h1>Create a new item</h1>
      <form className="details-head create-form" onSubmit={handleSubmit}>
        <label>Item name</label>
        <input type="text" name="item_name" onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''} />
        <label>Quantity</label>
        <input type="number" name="quantity" onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : 'Number'} />
        <label>Description</label>
        <input className="description-input" type="text" name="description" onChange={handleInputChange} placeholder={formDataMissing ? '**Required' : ''} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  )
}