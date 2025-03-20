# RoomRentalApp
This project is a web application for people who are looking to rent rooms or apartments in Spain. It allows two types of users:

Searchers (Buscador) - Users looking for a room or apartment.
Advertisers (Anunciante) - Users who want to publish their rooms or apartments for rent.
Features
User Registration:

Users can register either as a "Searchers" or "Advertisers".
Searchers can provide preferences, such as needing a private bathroom, air conditioning, or specific conditions regarding shared housing.
Listing Creation:

Advertisers can create listings for rooms or apartments, including photos, descriptions, and pricing.
Tinder-Like Swipe:

Searchers can swipe right if they like a listing or left if they don't.
When a searcher likes a listing, a potential match is created.
Chat:

Once a match is made, a basic chat system allows communication between the searcher and the advertiser.
Tech Stack
Frontend:

React.js for building the user interface.
CSS for styling.
Backend:

Flask (Python) for handling the API and business logic.
SQLAlchemy to interact with an SQLite database for storing user data and listings.
Database:

SQLite is used to store user data, listings, and other information.
Routes
/register [POST]: Register a user (either a "Searcher" or "Advertiser").
/create_listing [POST]: Create a listing for a room or apartment (only for advertisers).
/get_listings [GET]: Fetch all listings from the database.
/swipe [POST]: Searchers can swipe left or right on listings.
/chat [POST]: A basic chat between matched users.
How to Run the Application
Follow these steps to get the project up and running on your local machine:

1. Clone the repository
bash
Copiar
Editar
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Set up the Backend (Flask API)
Install dependencies:

Ensure you have Python installed, then install the required libraries:

bash
Copiar
Editar
pip install -r requirements.txt
Set up the database:

The first time you run the application, you need to create the database:

bash
Copiar
Editar
python app.py
This will initialize the SQLite database.

Run the Flask application:

To start the backend server:

bash
Copiar
Editar
python app.py
The Flask server should now be running on http://127.0.0.1:5000.

3. Set up the Frontend (React App)
Install dependencies:

Inside the frontend directory (e.g., frontend), run:

bash
Copiar
Editar
npm install
Start the React application:

To start the frontend server:

bash
Copiar
Editar
npm start
The frontend should now be running on http://localhost:3000.

4. Using the App
Navigate to the frontend (http://localhost:3000).
Register either as a "Searcher" or "Advertiser".
As a "Searcher", you can set preferences and swipe on listings.
As an "Advertiser", you can create listings for rooms or apartments.
Matches will allow you to initiate a basic chat with the other user.
License
This project is open source and licensed under the MIT License.

Dependencies:
Backend (Flask):

Flask
Flask-SQLAlchemy
Frontend (React):

React
React-DOM
Axios (for making HTTP requests)
