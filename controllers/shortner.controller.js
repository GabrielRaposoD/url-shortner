const Shortner = require('../models/shortner.model');
const crypto = require('crypto');

exports.shortner_create = async (req, res) => {
  const regexUrl = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(regexUrl);
  if (!req.body.url.match(regex)) {
    return res.status(400).json('Invalid URL');
  }

  const hasUrl = await Shortner.findOne({
    url: req.body.url,
  });

  if (hasUrl) {
    return res.status(409).json(hasUrl);
  }

  const shortner = new Shortner({
    url: req.body.url,
    shortnedUrl: crypto.randomBytes(5).toString('hex'),
  });

  try {
    res.status(201).json(await shortner.save());
  } catch (error) {
    throw error;
  }
};

exports.shortner_delete = async (req, res) => {
  try {
    return await Shortner.deleteMany();
  } catch (error) {
    return res.status(404).send('Invalid URL');
  }
};

exports.shortner_get = async (req, res) => {
  try {
    const { url } = await Shortner.findOne({
      shortnedUrl: req.params.shortnedUrl,
    });
    return res.redirect(url);
  } catch (error) {
    return res.status(404).send('URL not found');
  }
};
