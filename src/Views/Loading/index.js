import Views from '..'
import Main from './Main'
import Error from './Error'

export default class Loading extends Views {
    Panels = [Main, Error]
}