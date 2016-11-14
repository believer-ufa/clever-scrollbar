import './polyfills/nodelist.js'
import './styles.js'
//import './css/main.css!'
import html from './html.js'

var load   = html.load
var reload = html.reload
var stop   = html.stop

export default html

export {
   load,
   reload,
   stop,
}