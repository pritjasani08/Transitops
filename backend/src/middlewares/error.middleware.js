module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON payload', errors: [] });
  }

  if (err.name === 'ValidationError') {
    return res.status(422).json({ success: false, message: 'Validation Error', errors: err.errors });
  }

  // Postgres specific errors
  if (err.code === '23505') { // unique violation
    return res.status(409).json({ success: false, message: 'Resource already exists.', errors: [err.detail] });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: [],
    stack: err.stack
  });
};
