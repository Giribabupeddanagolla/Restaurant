const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err.message || err);

  // If MongoDB is offline or query times out due to missing DB connection, gracefully fallback
  if (
    err.name === 'MongooseError' ||
    err.name === 'MongooseServerSelectionError' ||
    err.message?.includes('buffering timed out') ||
    err.message?.includes('ECONNREFUSED') ||
    err.message?.includes('connect')
  ) {
    return res.status(200).json({
      success: true,
      count: 0,
      data: [],
      message: 'Database offline. Operating in local fallback mode.',
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
