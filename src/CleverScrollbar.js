import './polyfills/nodelist'
import html from './html'

var load   = html.load
var reload = html.reload
var stop   = html.stop

export default html

export {
   load,
   reload,
   stop,
}