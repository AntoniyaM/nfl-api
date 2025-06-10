# NFL Public API 🏈

A public API for NFL teams and players information I developed for my personal applications.

## Overview

This API provides access to NFL teams and active players data stored in Firebase. See the [Swagger docs](http://localhost:3000/) for detailed information on the available endpoints.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Firebase (Firestore)
- Swagger UI for API documentation

## API Endpoints

### Teams

- `GET /api/teams` - Get all NFL teams
- `GET /api/teams/{id}` - Get a specific team by ID

### Players

- `GET /api/players` - Get all NFL players
- `GET /api/players/{id}` - Get a specific player by ID
