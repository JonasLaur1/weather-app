# Weather Dashboard

A minimal weather forecast dashboard built with Vue 3, TypeScript, Vite, and Bulma.

It fetches current weather data from the OpenWeatherMap API using axios, and allows you to search, add, and manage forecasts saved in localStorage.

## Prerequisites

- Node.js v14 or higher

- npm v6 or higher

- A free account and API Key from OpenWeatherMap

## Installation


1) Clone the repository:
```
git clone https://github.com/JonasLaur1/weather-app.git
```
3) Go into the root folder
```
cd ./client/
```
3) Install dependencies:
```
npm install
```
4) Create a .env file in the project root folder ./client/ and add your API key:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## Usage
- For development server run this command:
```
npm run dev
```

- For http-server:
 1) First build for production:
```typescript
npm run build
```
2) Start http-server:
```
npx http-server dist
```