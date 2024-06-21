const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const user = await userService.register(username, password,email);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userDetails = async (req,res)=>{
try{
  const {username} = req.params
  const data = await userService.userDetails(username)
  res.status(200).json(data)
}
catch(err)
{
  res.status(400).json({Messaage : err.message})
}
}

module.exports = { register, login,userDetails };
