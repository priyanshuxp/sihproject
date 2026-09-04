import ApiError from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Handle Joi validation errors
  if (err.isJoi) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.details?.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message.replace(/['"]/g, ""),
    })) || [];
  }

  // Handle Prisma unique constraint violation (P2002)
  if (err.code === "P2002") {
    statusCode = 409;
    const target = err.meta?.target ? (Array.isArray(err.meta.target) ? err.meta.target.join(", ") : err.meta.target) : "field";
    message = `A record with this ${target} already exists.`;
    errors = [{ field: target, message }];
  }

  // Handle Prisma record not found (P2025)
  if (err.code === "P2025") {
    statusCode = 404;
    message = err.meta?.cause || "Record not found.";
    errors = [{ message }];
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired.";
  }

  // Never leak password hashes or internal trace in production
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errors.length > 0 ? errors : undefined,
  });
};

export default errorHandler;