#!/bin/bash
cd frontend
echo "Be patient, it may take a minute or so."
npm install
npm start &
cd ../backend
npm install
node app.js
