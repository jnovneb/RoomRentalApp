RoomRentalApp
This project is a web application for people who are looking to rent rooms or apartments in Spain. It allows two types of users:

Searchers – Users looking for a room or apartment.

Advertisers – Users who want to publish their rooms or apartments for rent.

Features
User Registration:
Users can register either as a "Searcher" or "Advertiser".

Searchers can provide preferences such as needing a private bathroom, air conditioning, or specific conditions regarding shared housing. These preferences are saved and can be used to filter potential listings.

Advertisers can provide their details and preferences for the listings they create.

Listing Creation:
Advertisers can create listings for rooms or apartments. This includes:

Title and description of the listing.

Price and photos.

The system will ensure that only advertisers can create listings.

Tinder-Like Swipe:
Searchers can swipe right if they like a listing or left if they don't.

When a searcher swipes right, a potential match is created, signaling to the advertiser that the searcher is interested in their listing.

This interaction is logged, allowing users to make decisions based on past activity.

Chat:
Once a match is made between a Searcher and Advertiser, a basic chat system allows them to communicate.

Messages are exchanged between users who have previously matched.

The chat system ensures that users can only communicate if a match exists, enforcing relevant privacy rules.

Tech Stack
Frontend:

React.js for building the user interface.

CSS for styling.

Backend:

Flask (Python) for handling the API and business logic.

SQLAlchemy for managing the database.

Database:

SQLite is used to store user data, listings, preferences, and chats.

Routes
/register [POST]: Register a user as a "Searcher" or "Advertiser".

/create_listing [POST]: Advertisers can create a listing for a room or apartment.

/get_listings [GET]: Fetch all available listings.

/swipe [POST]: Searchers can swipe left or right on listings.

/chat [POST]: A basic chat functionality between matched users.

How to Run the Application
Follow these steps to get the project up and running on your local machine:

1. Set up the Backend (Flask API)
Install dependencies:

Ensure you have Python installed, then install the required libraries:

pip install -r requirements.txt
Set up the database:

The first time you run the application, you need to create the database:

python app.py
This will initialize the SQLite database with user and listing tables.

Run the Flask application:

To start the backend server:

python app.py
The Flask server should now be running on http://127.0.0.1:5000.

2. Set up the Frontend (React App)
Install dependencies:

Inside the frontend directory (e.g., frontend), run:

npm install
Start the React application:

To start the frontend server:

npm start
The frontend should now be running on http://localhost:3000.

3. Using the App
Navigate to the frontend (http://localhost:3000).

Register either as a "Searcher" or "Advertiser".

Searchers can set preferences (like a private bathroom, air conditioning, etc.) and swipe on listings.

Advertisers can create listings for rooms or apartments.

Matches will allow you to initiate a basic chat with the other user once both have liked each other's listings.

License
This project is open-source and licensed under the MIT License.