// Core
import express from "express";
import cookieParser from "cookie-parser";
import cloudinaryInit from "./cloudinary.init.js";

const loadMiddleware = (app) => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true })); // to parse from data
    cloudinaryInit();
};

export default loadMiddleware;