import React from 'react';

var BackendURL = "http://localhost:5000";

export function GET() {
  return fetch(BackendURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

export function POST(data = {}) {
  fetch(BackendURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
