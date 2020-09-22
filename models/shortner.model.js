const mongoose = require('mongoose');

module.exports = mongoose.model('Shortner', {
  url: {
    type: String,
    required: true,
  },
  shortnedUrl: {
    type: String,
    required: true,
  },
});
