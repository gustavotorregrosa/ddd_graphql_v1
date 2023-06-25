import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

export interface ShowProductsModalProps {
    open: boolean
    name: string
    handleClose: () => void
    handleEdit: (e: ChangeEvent<HTMLInputElement>) => void
    handleSave: () => void
}

export const EditModal: React.FC<ShowProductsModalProps> = ({open, name, handleClose, handleEdit, handleSave}) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='row'><TextField onChange={(e: ChangeEvent<HTMLInputElement>) => handleEdit(e)} value={name} id="standard-basic" label="Category" variant="standard"/></div>
                <br/><br/>
                <div className='row'><Button onClick={handleSave} variant="outlined">Save</Button></div>
            </Box>
        </Modal>)

}