import * as API from '../helpers/fetchAPI.helper'
    
export const getFilms = async () => {
    return await API.fetchHelper('films/')
}