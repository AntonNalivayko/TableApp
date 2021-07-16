import React, { Fragment } from 'react';
import { Button }from 'react-bootstrap';
import { nanoid } from 'nanoid';
import data from './db.json'
import './App.css';
import * as ReactBootStrap from 'react-bootstrap'
import ReadOnlyRow from './components/ReadOnlyRow'
import EditTableRow from './components/EditTableRow';

/* Алексей не смог прокинуть new Date() в таблицу через useState, что бы при onSubmit он фиксировал значение переводил его в строку
и передавал в useState, почему то он приходит undefinded, гугление не помогло, прежде не делал подобного, поэтому не смог это выполнить, 
значения просто подгрузил из json.
Добавление в таблицу сделал, 
Инпуты очищаются при onSubmit,
Редактирование таблицы сделал, все редактируется, удаляется, сохраняется,
Фильтрацию сделал при клике на шапку столбца,    
*/


function App() {

  const [contacts, setContacts] = React.useState(data);
  const [addFormData, setAddFormData] = React.useState({
    fullName: '',
    dataold: '',
    city: '',
    email: '',
    phoneNumber: '',
    timesec: '',
    timeseclast: ''
  });

const [editFormData, setEditFormData] = React.useState({
  fullName: '',
    dataold: '',
    city: '',
    email: '',
    phoneNumber: '',
    timesec:'',
    timeseclast: ''
});

  const [editContactId, setEditContactId] = React.useState(null);


  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    console.log(newFormData)

  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};

    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    
    const dw = new Date().toLocaleTimeString();
    
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      dataold: addFormData.dataold,
      city: addFormData.city,
      email: addFormData.email,
      phone: addFormData.phone,
      timesec: addFormData.dw 
    }
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    event.target.reset()
        
  }


  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      dataold: editFormData.dataold,
      city: editFormData.city,
      email: editFormData.email,
      phone: editFormData.phone,
      
    }

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact)=> contact.id === editContactId );

    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);

  };


  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      dataold: contact.dataold,
      city: contact.city,
      email: contact.email,
      phone: contact.phone,
      
      }
      setEditFormData(formValues);
  }


  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === contactId);
  
      newContacts.splice(index, 1);

      setContacts(newContacts)
    }

    const sortData = (field) => {

      const copyData = contacts.concat();
      const sortData = copyData.sort(
        (a, b) => {return a[field] > b[field] ? 1 : -1}
      );
      setContacts(sortData)
    }

    const dw = new Date().toLocaleTimeString();

  // useEffect(() => {
  //   axios.get('http://localhost:3000/db.json').then(({ data }) => {
  //     setItemsData(data.Persons);

  //    
  //   });
  // }, []);

  return (
    <>
      <div className="deskpage">
        <div className='Toptittle'>
          <h1> </h1>
        </div>
        <div className='formbox'>

<form onSubmit={handleAddFormSubmit}>
  <h4> Добавить нового пользователя </h4>
 <div>
  <input
    type='text'
    name='fullName'
    required='required'
    placeholder='Фамилия инициалы'
    onChange={handleAddFormChange}
    
  />
  
  <input
    type='text'
    name='dataold'
    required='Не может быть пустым'
    placeholder='Год рождения'
    onChange={handleAddFormChange}
  />
  <input
    type='text'
    name='city'
    required='required'
    placeholder='Место рождения(Краснодар)'
    onChange={handleAddFormChange}
    pattern="^[[А-Яа-яЁё\s ,.'-]+$"
    
  />
  </div>
  <div>
  <input
    type='text'
    name='email'
    required='required'
    placeholder='Электронная почта'
    onChange={handleAddFormChange}
    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
    title="Invalid email address"
  />
  <input
    type='text'
    name='phone'
    required='required'
    placeholder='Номер телефона(89184556655)'
    onChange={handleAddFormChange}
    pattern="^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"
  />
  </div>
  <Button type="submit" variant="info">
    добавить
  </Button>
</form>


</div>

        <form onSubmit={handleEditFormSubmit}>
          при нажатии на заглавие столбца происходит фильтрация от меньшего к большему
        <ReactBootStrap.Table className='table' striped bordered hover variant="dark" responsive="sm">
          <thead>
            <th onClick={()=>{sortData('fullName')}} >  ФИО</th>
            <th onClick={()=>{sortData('dataold')}} >Дата рождения</th>
            <th onClick={()=>{sortData('city')}} >Место рождения</th>
            <th onClick={()=>{sortData('email')}} >Почта</th>
            <th onClick={()=>{sortData('phone')}} >Телефон</th>
            <th onClick={()=>{sortData('')}} >Дата регистрации</th>
            <th onClick={()=>{sortData('')}} >Последнее посещение сайта</th>
            <th >Действия</th>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id 
                ? (< EditTableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/> ) 
                : (< ReadOnlyRow 
                  contact={contact}
                  handleEditClick={handleEditClick} 
                  handleDeleteClick={handleDeleteClick}
                />
                )}
              </Fragment>
            ))}
          </tbody>

        </ReactBootStrap.Table>
        </form>



      </div>
     
    
    </>
  );
}

export default App;


