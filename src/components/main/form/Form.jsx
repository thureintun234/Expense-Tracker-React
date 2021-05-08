import React, { useState,useContext, useEffect } from 'react'
import {TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'
import {ExpenseTrackerContext} from '../../../context/context'
import { v4 as uuidv4 } from 'uuid'
import {useSpeechContext} from '@speechly/react-client'

import useStyles from './styles'
import {incomeCategories,expenseCategories} from '../../../constants/categories'
import formatDate from '../../../utils/formatDate'
import SnackBar from '../../snackbar/SnackBar'


const initialState = {
    amount:'',
    category:'',
    type:'Income',
    date:formatDate(new Date())
}

const Form = () => {
    const classes = useStyles()
    const [formData,setFormData] = useState(initialState)
    const { addTransition } = useContext(ExpenseTrackerContext)
    const {segment} = useSpeechContext()
    const [open,setOpen] = useState(false)

    const createTransition = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const transition = {...formData,amount:Number(formData.amount), id: uuidv4()}

        setOpen(true)
        addTransition(transition)
        setFormData(initialState)
    }

    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === 'add_income') {
                setFormData({...formData,type:'Income'})
            }

            segment.entities.forEach(e => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`

                switch(e.type) {
                    case 'amount':
                        setFormData({...formatDate,amount:e.value})
                        break;
                    case 'category':
                        setFormData({...formData,category})
                        break;
                    case 'date':
                        setFormData({...formData,date:e.value})
                    default:
                        break;
                }
            })
            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransition()
            }
        }
    },[segment])

    const seletedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <SnackBar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" >
                   {segment && segment.words.map(w => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={e => setFormData({...formData,type:e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={e => setFormData({...formData,category:e.target.value})}>
                        {seletedCategories.map(c => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>  
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.value} onChange={e => setFormData({...formData,amount:e.target.value})} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={e => setFormData({...formData,date:formatDate(e.target.value)})} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransition}>Create</Button>
        </Grid>
    )
}

export default Form
