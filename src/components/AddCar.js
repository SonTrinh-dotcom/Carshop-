import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function AddCar(props) {
    const [open,setOpen] = useState(false);

    const [car, setCar] = useState ({
        brand:'',
        model:'',
        price:'',
        color:'',
        fuel:'',
        year:'',
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const inputChanged = (e) => {
        setCar({...car, [e.target.name]: e.target.value})
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

return(
    <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
    Add Car
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">New car</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus = 'true'
        name='brand'
        value={car.brand}
        margin='dense'
        label="Brand"
        onChange={inputChanged}
        fullWidth
        />
         <TextField
        name='model'
        value={car.model}
        margin='dense'
        label="Model"
        onChange={inputChanged}
        fullWidth
        />
        <TextField
        name='color'
        value={car.color}
        margin='dense'
        label="Color"
        onChange={inputChanged}
        fullWidth
        />
        <TextField
        name='fuel'
        value={car.fuel}
        margin='dense'
        label="Fuel"
        onChange={inputChanged}
        fullWidth
        />
        <TextField
        name='price'
        value={car.price}
        margin='dense'
        label="Price"
        onChange={inputChanged}
        fullWidth
        />
        <TextField
        name='year'
        value={car.year}
        margin='dense'
        label="year"
        onChange={inputChanged}
        fullWidth
        />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSave} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>

    </div>
)
}

export default AddCar;