import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import AddCar from './AddCar'
import EditCar from './EditCar'

export default function Carlist() {
    const [cars, setCars] = useState ([]);

    const gridRef = useRef();

    const [open,setOpen] = useState(false);
    
    const [msg, setMsg] = useState('');

    useEffect(()=> getCars(),[]);

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data =>setCars( data._embedded.cars )) // save data to setCars
        .catch(err => console.error(err) )
    }

    const deleteCars = (link) => {
        if(window.confirm('Are you sure'))
            {
        fetch(link, {       //fetch have the second argument, and the second arguments are object 
            method: 'DELETE'
        })
        .then(_ => getCars())
        .then(_ => {
            setMsg('Car deleted successfully');
            setOpen(true);
        })
        
        .catch(err => console.error(err))
            }
    }


    const addCar = (newCar) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCar) //body is not JS code, so we want to send the data to body request we need to transform via JSON.stringfy 
        })
        .then(_ => getCars())
        .then(_ => {
            setMsg('Car added successfully');
            setOpen(true);
        })
        
        .catch(err => console.error(err))

    }

    const updateCar = (link) => {
        fetch(link, {
            method: 'PUT'
        })
        .then(_ => getCars())
        .then(_=>{
            setMsg('Car updated successfully');
            setOpen(true);
        })
        .catch(err => console.error(err));
    }


    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {headerName: 'Brand', field: 'brand', sortable: true, filter:true},
        {headerName: 'Model', field: 'model', sortable: true, filter:true},
        {headerName: 'Color', field: 'color', sortable: true, filter:true},
        {headerName: 'Fuel', field: 'fuel', sortable: true, filter:true},
        {headerName: 'Year', field: 'year', sortable: true, filter:true},
        {headerName: 'Price', field: 'price', sortable: true, filter:true},
        {
            headerName: '',
            width: 90,
            field: '_links.self.href',
            cellRendererFramework: params => <EditCar params = {params} /> //params want to render //now we want to send params to editCar via props, props name is params and props value is params
        },

        {headerName: '', 
        width: 90,
        field: '_links.self.href',
        cellRendererFramework : params => <Button
                                            color='secondary'
                                            size='small'
                                            onClick ={() => deleteCars(params.value)}>Delete</Button> // params want to render a button for deleting a cell 
    },


    ]

    return (

        <div>

        <AddCar addCar={addCar} />

            <div className="ag-theme-material" style={ { height: '700px', width: '95%', margin: 'auto' } }>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params =>
                        {
                            gridRef.current = params.api
                            params.api.sizeColumnsToFit();
                        }
                    }
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    >
                </AgGridReact>
                <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={msg}
                >
                
                </Snackbar>

            </div>

        </div>
    );
}