import Views from '..'
import Main from './Main'
import Page2 from './Page2'
import Page3 from './Page3'

export default class Welcome extends Views {
    Panels = [Main, Page2, Page3]
}