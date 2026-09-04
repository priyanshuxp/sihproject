import ApiError from "../utils/ApiError.js";

/**
 * Middleware factory for Joi schema validation
 * @param {import('joi').ObjectSchema} schema 
 * @param {'body' | 'params' | 'query'} source 
 */
export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const dataToValidate = req[source];
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/['"]/g, ""),
      }));
      return next(new ApiError(400, "Validation Error", details));
    }

    req[source] = value;
    next();
  };
};

export default validate;
