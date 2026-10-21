const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;


const validateRegister = (req, res, next) => {
  const { email, password } = req.body || {};
  const errors = [];

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push('Please provide a valid email address');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  next();
};


const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};
  const errors = [];

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  }
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  next();
};


const validateTaskInput = (req, res, next) => {
  const { title, priority } = req.body || {};
  const errors = [];

  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || !title.trim()) {
      errors.push('Title is required and cannot be empty');
    }
  }

  if (req.method === 'PUT' && title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      errors.push('Title cannot be an empty string');
    }
  }

  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      errors.push(`Invalid priority "${priority}". Priority must be low, medium, or high.`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTaskInput
};

