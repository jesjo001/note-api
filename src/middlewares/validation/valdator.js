import { body, validationResult } from 'express-validator';

export const userValidationRules = () => {
    return [
        body("name").not().isEmpty(),
        body("email").not().isEmpty(),
        body("password").not().isEmpty(),
        body("firstname").not().isEmpty(),
        body("lastname").not().isEmpty(),
    ]
}

export const sessionValidationRules = () => {
    return [
      //validation email
      body("email").not().isEmpty(),
      // password must be at least 8 chars long
      body("password").isLength({ min: 8 }),
    ];
  };

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    //@ts-ignore
    errors.array().map((err) => extractedErrors.push({ [err?.param]: err?.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    });
  };
  