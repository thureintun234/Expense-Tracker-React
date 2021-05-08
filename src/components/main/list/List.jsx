import React,{useContext} from 'react'
import {List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from '@material-ui/core'
import {Delete, MoneyOff} from '@material-ui/icons'
import { ExpenseTrackerContext } from '../../../context/context'


import useStyles from './styles'

const List = () => {
    const classes = useStyles()
    const {deleteTransition,transitions} = useContext(ExpenseTrackerContext)

    // const transitions = [
    //     {id:1,type:'Income', category:'Salary', amount:50, date:"Wed Dec 16"},
    //     {id:2,type:'Expense', category:'Pets', amount:50, date:"Wed Dec 17"},
    //     {id:3,type:'Income', category:'Business', amount:150, date:"Wed Dec 18"}
    // ]

    return (
        <MUIList dense={false} className={classes.list}>
            {transitions.map(transition => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transition.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transition.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transition.category} secondary={`$${transition.amount} - ${transition.date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTransition(transition.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List
