# Currency Converter Mobile App

A React Native currency converter application that uses the Open Exchange Rates API.

## Overview

This mobile application allows users to convert between different currencies using real-time exchange rates from the Open Exchange Rates API. Built with React Native and Expo, the app provides a simple and intuitive interface for currency conversion.

## Features

- Real-time currency conversion
- Support for multiple currencies
- Clean and intuitive user interface

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd tecxa
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create an account at [Open Exchange Rates](https://openexchangerates.org/) and get your API key.

4. Create a `.env` file in the root directory with your API key:
   ```
   API_KEY=your_api_key_here
   ```

## Setting Up the Open Exchange Rates API

1. Register for a free or paid account at [Open Exchange Rates](https://openexchangerates.org/).
2. After signing up, go to your account dashboard to get your API key.
3. The free tier allows for:
   - Up to 1,000 API requests per month
   - Hourly updates of exchange rates
   - USD as the base currency (paid plans allow for any base currency)

## API Endpoints Used

The application primarily uses the following endpoint:
- Latest Exchange Rates: `https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID`

## Running the App

Start the development server:

```bash
npx expo start
```

Then, you can run the app on:
- iOS simulator by pressing `i`
- Android emulator by pressing `a`
- Web browser by pressing `w`
- Physical device by scanning the QR code with the Expo Go app


## Acknowledgements

- [Open Exchange Rates](https://openexchangerates.org/) for providing the currency exchange rate data
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
