import Job from '../models/JobModels.js';
import { StatusCodes } from 'http-status-codes';

//Get All Data in the Collection
export const getAllJobs = async (req, res) => {
  console.log(req);
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

//Add to DB - Data in the Collection
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};


//Get a spefic data in the Collection
export const getJob = async (req, res) => {

    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};

//Update Job in the collection
export const updateJob = async (req, res) => {;
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new:true
    });
    res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
  };

//Delete Data in the Collection
export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    console.log(removedJob);
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob});
  };