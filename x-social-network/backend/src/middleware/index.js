// Core
import express from "express";
import cookieParser from "cookie-parser";

const loadMiddleware = (app) => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true })); // to parse from data
};

export default loadMiddleware;