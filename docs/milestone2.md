# Representation of APIs

# Descriptions of client interface
These are the following pages that will be used for our application:
* Login
    * a typical log in page with a button to sign in with a username and password. there is also a button to create a new account that brings you to the signup page. after signing in the user is brought to the input page.  
![alt text](https://user-images.githubusercontent.com/28848384/140631718-1028086f-448c-4612-936f-1b1343d1474e.png)
* Signup
    * standard sign up page, sign up button, asks for a username, password and confirmation of the password. There is also a checkbox for showing password. after signing up the user is brought back to the sign in page. 
 ![alt text](https://user-images.githubusercontent.com/28848384/140631706-c3e67221-e6a8-4017-9c98-3e56ffa1cb01.png)
* input 
    * this will be the input page of the text where users can put in whatever they want to be analyzed and scored by hitting the anaylze button which brings them to the output page. In addition there is a sign out button you can sign out of your account which holds a history of inputted text.
  ![alt text](https://user-images.githubusercontent.com/28848384/138577395-88a2c6fd-1d08-46c6-8658-ab0eb40d4e48.png)
* output 
    * this will be the output results page. This page will contain the results/metrics of the rest of the user's history of inputted texts/results previous inputs. There is a sign out button to exit the account which brings you to the login page and a "analyze again" button that will bring you to the input page to do it once again. there is also a button for updating sentiment and language which stays on this page.
    ![alt text](https://user-images.githubusercontent.com/28848384/140631722-429e2320-abf5-4cfd-b15b-9dd6d256bfba.png)
* results
    * This will be the result page. This page will carry all the metrics of the previously inputted text.
    There is a sign out button to exit the account which brings you to the login page and a "analyze again" button that will bring you to the input page to do it once again. there is also a button for updating sentiment and language which stays on this page.
    ![alt text](https://user-images.githubusercontent.com/28848384/140631713-1270bcd1-ea36-4f19-98fd-f8c187190a61.pngg)
# Heroku URL 
* https://dashboard.heroku.com/teams/team-nu-cs326-f2021/apps 

# breakdown of labor
* Group
    Design of the api, and json schema.

* Benjamin Rao brao980 
    implemented Signup, other functions, post,get,delete requests, and globalized variables. 

* Andrew Sun asun2
    Created the backend with endpoints and verified them with requests on the front end. Worked out some of the logic on the frontend side of the code. Created a flowchart representation of the API.

* Elias Martin hedge0 
    Added event listeners for all buttons and stitched together pages via buttons. Added fully functional tables that could handle arrays of json objects in javascript. Added a couple of the fetch requests. Fixed up the bugs in html / css from milestone 1 and reformatted to improve the overall website appearance.
