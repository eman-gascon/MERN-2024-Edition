import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';
import mongoose from 'mongoose';
import Job from '../models/JobModels.js';
import User from '../models/UserModels.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            console.log(errors);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if(errorMessages[0].startsWith('No Job')) {
                throw new NotFoundError(errorMessages);
            }  
                throw new BadRequestError(errorMessages);
            }
            next();
            },
    ];
};

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid type value')
]); 

export const validateIdParam = withValidationErrors ([
    param('id')
    .custom(async (value) => {
    const isValiMongodId = mongoose.Types.ObjectId.isValid(value)
    if(!isValiMongodId) throw new BadRequestError('Invalid MongoDB Id');
    const job = await Job.findById(value);
    if(!job) throw new NotFoundError(`No job with id ${value}`);
}),
]);

export const validateRegisterInput = withValidationErrors ([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom( async (email) => {
        const user = await User.findOne({ email });
        if (user) {
            throw new BadRequestError('email already exists');
        }
    }),
    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:8})
    .withMessage('passowrd must be a least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
]);

export const validateLoginInput = withValidationErrors ([
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
    body('password')
    .notEmpty()
    .withMessage('password is required'),
]);