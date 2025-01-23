# Jammming

## Description
Jammming is a React web application that allows users to search the Spotify library, create custom playlists, and save them directly to their Spotify account. This project demonstrates the integration of React with the Spotify API to create a seamless music playlist management experience.

## Features
- 🔍 **Search Songs**: Users can search for songs by title in the Spotify library
- 📱 **Display Track Information**: View detailed information about songs including:
  - Song title
  - Artist name
  - Album name
- ➕ **Playlist Management**: 
  - Create custom playlists
  - Add/remove tracks from playlists
  - Name and save playlists
- 💾 **Spotify Integration**: 
  - Save playlists directly to your Spotify account
  - Seamless authentication with Spotify
  - Real-time synchronization with Spotify library

## Technologies Used
- **Frontend Framework**: React
- **Version Control**: Git
- **API Integration**: Spotify Web API
- **Languages**: 
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Authentication**: OAuth 2.0 (Spotify)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js installed on your local machine
- A Spotify account (free or premium)
- Basic knowledge of:
  - HTML
  - CSS
  - JavaScript
  - React
  - HTTP Requests and Responses
  - Authentication concepts

## Installation
1. Clone the repository
   ```bash
   git clone https://github.com/bakadja/Jammming-v1.git
2. Navigate to the project directory
   ```bash
   cd Jammming-v1
3. Install dependencies
   ```bash
   npm install
4. Create a .env file in the root directory and add your Spotify API credentials(eg. clientId, etc):
   ```bash
   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here
6. Start the development server
   ```bash
   npm run dev

## Usage
1. Log in with your Spotify account
2. Search for songs using the search bar
3. Click the "+" button to add songs to your custom playlist
4. Give your playlist a name
5. Click "Save to Spotify" to export your playlist

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Contact
Email: contact@kevinpaulidor.de

## Acknowledgments
- Spotify Web API Documentation
- React Documentation
- localForage Documentation
