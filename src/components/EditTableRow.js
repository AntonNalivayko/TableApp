import React from 'react';
import { Button }from 'react-bootstrap';

const EditTableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {

   

    return (
        <tr>
            <td>
                <input
                    type='text'
                    name='fistName'
                    required='required'
                    placeholder='Введите ФИО'
                    onChange={handleEditFormChange}
                    value={editFormData.fistName}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='dataold'
                    required='required'
                    placeholder='Введите год рождения'
                    onChange={handleEditFormChange}
                    value={editFormData.dataold}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='city'
                    required='required'
                    placeholder='Введите место рождения'
                    onChange={handleEditFormChange}
                    value={editFormData.city}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='email'
                    required='required'
                    placeholder='Введите электронную почту'
                    onChange={handleEditFormChange}
                    value={editFormData.email}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='phone'
                    required='required'
                    placeholder='Введите номер телефона'
                    onChange={handleEditFormChange}
                    value={editFormData.phone}
                />
            </td>
            <td></td>
            <td></td>
            <td>
                <Button type='submit'  variant="info">
                    Сохранить
                </Button>
                <Button type='button'  variant="info" onClick={handleCancelClick}>
                    Отмена
                </Button>
            </td>

        </tr>
    )
}

export default EditTableRow
