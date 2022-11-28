const { NODE_ENV, JWT_PROD_SECRET } = process.env;

module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_PROD_SECRET : '370b31ea-bcf5-4a13-a3ca-80085361703e';

module.exports.LINK_REGEXP = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;
