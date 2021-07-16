import React from 'react';
import { Button }from 'react-bootstrap';

const ReadOnlyRow = ({contact, handleEditClick, handleDeleteClick, }) => {

    const dw = new Date().toLocaleTimeString();

    return (
        <tr>
            <td>{contact.fullName} </td>
            <td>{contact.dataold}</td>
            <td>{contact.city}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>{contact.timesec}</td>
            <td>{contact.timeseclast}</td>
            <td>
                <Button type='button' variant="info" onClick={(event)=> handleEditClick(event, contact)}>
                    Изменить
                </Button>
                <Button type='button' variant="danger" onClick={()=> handleDeleteClick(contact.id)}>
                    удалить
                </Button>
               
            </td>

        </tr>
    )
}

export default ReadOnlyRow
