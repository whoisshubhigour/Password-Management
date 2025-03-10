import Password from '../models/passwordModel.js';

// @desc    Create a new password entry
// @route   POST /api/passwords
// @access  Private
const createPassword = async (req, res) => {
  try {
    const {platformName, category, subcategory, username, password, phoneNumber } = req.body;

    const passwordEntry = await Password.create({
      user: req.user._id,
      category,
      subcategory,
      platformName,
      username,
      password,
      phoneNumber,
    });

    res.status(201).json(passwordEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all passwords for a user
// @route   GET /api/passwords
// @access  Private
const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user._id });
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a password entry
// @route   DELETE /api/passwords/:id
// @access  Private
const deletePassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);

    if (password) {
      if (password.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      await password.deleteOne();
      res.json({ message: 'Password removed' });
    } else {
      res.status(404).json({ message: 'Password not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPassword, getPasswords, deletePassword };