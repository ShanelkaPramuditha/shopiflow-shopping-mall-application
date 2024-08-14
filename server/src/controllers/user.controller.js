import { register } from '../services/user.service.js';

const UserController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, role, gender, mobile, password } = req.body;

      if (!firstName || !lastName || !email || !role || !gender || !mobile || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await register({ firstName, lastName, email, role, gender, mobile, password });

      if (user) {
        return res.status(201).json({ message: 'User created successfully' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default UserController;
