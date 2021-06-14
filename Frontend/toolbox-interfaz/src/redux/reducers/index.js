import textListReducer from './textList'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    textList : textListReducer
})

export default allReducers