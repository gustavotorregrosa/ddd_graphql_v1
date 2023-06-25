import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

export interface DeleteModalProps {
    open: boolean
    name: string
    handleClose: () => void
    handleDelete: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({open, name, handleClose, handleDelete}) => {
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
                <div className='row'>
                    <p>Do you whish to delete the {name} category</p>
                </div>
                <br/><br/>
                <div className='row'><Button onClick={handleDelete} variant="outlined">Delete</Button></div>
            </Box>
        </Modal>)

}