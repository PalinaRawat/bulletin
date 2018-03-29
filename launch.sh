#!/bin/bash
cd frontend
echo 'launch may take a few minutes'
npm install
npm start &
cd ../backend
npm install
node app.js
