import { register } from '../services/user.service.js';

const UserController = {
  register: async (req, res) => {
    console.log(req.body);
    try {
      const { firstName, lastName, email, role, gender, mobile, password } = req.body;

      if (!firstName || !lastName || !email || !role || !gender || !mobile || !password) {
        return res.status(400).json({ message: 'All fields are required' + req.body });
      }

      const user = await register({ firstName, lastName, email, role, gender, mobile, password });

      if (user) {
        return res.status(201).json({ message: 'User created successfully' });
      }
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
  profile: async (req, res) => {
    return res.status(200).json({ message: 'Profile' });
  }
};

export default UserController;
