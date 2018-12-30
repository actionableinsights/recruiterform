# to do

1. Display default data for word_count and whatsapp fields
2. Rewrite terms and translate 
3. Allow users to select language for interface and terms
4. Language pair to and from must not be the same


# Simple Form

## Description

Serves application form and handles saving of submitted data into MongoDB database.

Form is built form JSON Schema - `public/schema.json` using Alpaca/jQuery and Bootstrap CSS.

Backend is built using `koa` Node.js framework.

## Usage

App is started by running `npm start` script.

`$ npm start`

### Environment variables

App requires two environment variables to be set:

  - PORT  The port number server will listen to (default: 4000)
  - MONGODB_URI  URI to MongoDB to save form to

When deploying to Heroku with mLab add-on, both variables are set by Heroku.

To run locally, set MONGODB_URI variable to your connection string

`$ MONDODB_URI=mongodb://user:password@host:port/database npm start`

## Customizing

### Updating fields

Form fields can be updated and re-ordered by modifying JSON Schema for the data in 
`public/schema.json` file. 

Field 'widgets' are controlled by the `options` parameter to `alpaca()` in the `index.html` file.

Currently form uses `multiselect`, `url` and `country` field types. There are several more field types
provided by Alpaca. Read http://alpacajs.org/documentation.html for details.

## Deploying to Heroku

App can be deployed to Heroku without additional configuration. Make sure you have mLab add-on installed, and that MONGODB_URI environment variable is available. This can be checked using Heroku CLI:

`$ heroku config:get MONGODB_URI`

### Deploying using BitBucket pipelines

This tutorial describes how to set up BitBucket Pipelines to push to Heroku: https://confluence.atlassian.com/bitbucket/deploy-to-heroku-872013667.html

Other CI/build tools can be setup similarly
