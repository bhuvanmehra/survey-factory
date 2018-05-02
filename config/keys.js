/**
 * Created by bmehra on 1/9/17.
 */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
