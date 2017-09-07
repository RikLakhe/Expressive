module.exports = function (req, res) {
 
  res.send(`konichiwa !! 
  	host name : ${req.hostname} 
  	
  	baseURL : ${req.baseUrl}`);
};