# Title
Team Nu

# Subtitle
Sentiment Analyzer

# Semester 
Fall 2021

# Overview: About Sentiment Analyzer
Sentiment Analyzer is a web application that gives users the ability to analyze segments of text by Amazon's Comprehend services. Users have the ability to enter a document up to 20 KB in size, and in turn receive sentiment statistics. Users can also choose to update and override these statistics if they choose to, and download their history of submissions. We sought out to bring an easy to use interface around Amazon's services such as dynamo and comprehend.

# Team Members
* Benjamin Rao brao980
* Andrew Sun asun2
* Elias Martin hedge0 

# User Interface
Our user interface is broken into 4 main sections- login, signup, results, and output.
* Login
    * a typical log in page with a button to sign in with a username and password. there is also a button to create a new account that brings you to the signup page. after signing in the user is brought to the input page.  
![alt text](https://github.com/hedge0/cs326-final-nu/blob/main/docs/UI_images/login.png)
* Signup
    * standard sign up page, sign up button, asks for a username, password and confirmation of the password. There is also a checkbox for showing password. after signing up the user is brought back to the sign in page. 
 ![alt text](https://github.com/hedge0/cs326-final-nu/blob/main/docs/UI_images/signup.png)
* input 
    * this will be the input page of the text where users can put in whatever they want to be analyzed and scored by hitting the anaylze button which brings them to the output page. In addition there is a sign out button you can sign out of your account which holds a history of inputted text.
  ![alt text](https://github.com/hedge0/cs326-final-nu/blob/main/docs/UI_images/input.png)
* output 
    * this will be the output results page. This page will contain the results/metrics of the rest of the user's history of inputted texts/results previous inputs. There is a sign out button to exit the account which brings you to the login page and a "analyze again" button that will bring you to the input page to do it once again. there is also a button for updating sentiment and language which stays on this page.
    ![alt text](https://user-images.githubusercontent.com/28848384/140631722-429e2320-abf5-4cfd-b15b-9dd6d256bfba.png)
    * with dummy data
    ![image](https://user-images.githubusercontent.com/9648650/140632274-91af2ccb-4872-49be-b1a6-7904d0754c68.png)
* results
    * This will be the result page. This page will carry all the metrics of the previously inputted text.
    There is a sign out button to exit the account which brings you to the login page and a "analyze again" button that will bring you to the input page to do it once again. there is also a button for updating sentiment and language which stays on this page.
    ![alt text](https://user-images.githubusercontent.com/28848384/140631713-1270bcd1-ea36-4f19-98fd-f8c187190a61.png)

# APIs
| Endpoint | Functionality |
| --- | --- |
| ```GET /``` | Sends the client side files |
| ```POST /signup``` | Handles new user sign up |
| ```POST /login``` | Handles logging in |
| ```POST /analyze/:username``` | Sends body of text and returns sentiment statistics / stores them in the database |
| ```UPDATE /updateSentiment/:username ``` | Overrides sentiment of text |
| ```UPDATE /updateLanguage/:username ``` | Overrides language of text |
| ```DELETE /delete/:username``` | Deletes the current text entry |
| ```GET /getUserLog/:username``` | Retrieves previous user text entries |


# Database
Our application uses Amazon Dynamo for the database. We had this checked off by professor Berger and the TA's and they gave us the thumbs up for it.
 We chose to use dynamoDB as we are also using aws-sdk so it seemed logical and more fluid to use DyanmoDB. In the database we store the user's account credentials along with all of the previous logs of text sent. Our schema is represented below. 

 #### User

```
{
    username: //string from signup ,
    salt: //salt value from minicrypt  ,
    hash: // hash value from minicrypt
}
```

- **username** is the user's chosen username, and will alert when user has picked an already chosen username
- **salt** is the salt value of the user's password
- **hash** is the hash value of the user's password




# URL routes
* Login Page: accessible to all

```https://sentiment-analyzer-team-nu.herokuapp.com/```

```https://sentiment-analyzer-team-nu.herokuapp.com/login.html``` 

* Signup Page: accessible to all
 
```https://sentiment-analyzer-team-nu.herokuapp.com/signup```

* Analyze Text Page: only accessible to logged in users, redirect on not logged in
 
```https://sentiment-analyzer-team-nu.herokuapp.com/input.html```

* Results Page: only accessible to logged in users, redirect on not logged in
 
```https://sentiment-analyzer-team-nu.herokuapp.com/results.html```

* Update Account Page: only accessible to logged in users, redirect on not logged in
 
```https://sentiment-analyzer-team-nu.herokuapp.com/output.html```

# Authentication/Authorization 
We utilize password salting and hashing for authentication, utilizing SHA-256. For session handling, we acknowledge that if the user presses the back button after being signed out, they will receive a cached version of the site, however they will not be able to access any other portion of the web application due to the appropriate session not being set.

# Division of Labor

* Group 
- Documentation, bugs and error handling, 

* Elias
    - Worked on initial front end design and revisions
    - Worked on large portions of the initial CSS
    - Worked on the initial html for login.html and results.html
    - Worked on implementing particles.js to make the website backround look nicer
    - Worked on re-implementing html functionality (buttons, inputs, tables, etc) with bootstrap to make the website look nicer
    - Worked on brushing up html and css to make more uniform and nicer
    - Worked on tying together pages via event listeners for buttons
    - Worked on adding javascript functionality to parse json data into html for rows of the tables
    - Worked on the first fetch request to help ben implement the rest of the requests
    - Worked on implementing aws tools such as dynamodb and comprehend for the backend
    - Worked on writing a skeleton code crud.js file for us to use when accessing the database
    - Worked on general bug fixes at all 3 stages including: making the html / css format properly, making the front end tables and fetch requests work, and making the back end database requests work (the reason for my large number of commits is mainly because I did a lot of the bug fixing / reformatting)

* Andrew 
    - Created and implemented endpoints the backend for various features.
    - Worked on user authentication using passport and minicrypt and session handling. 
    - implemented server connection to database for user authentication with crud functions that elias made.
    - some error handling on client side
    - implemented a function to convert json arrays to csv format.
    - implemented a download button by saving userlogs as a csv file.
    - worked on creating a table in results.html on get request.
    - general bug fixes, including table formatting, css fixes, and various functionality fixes.

* Ben
    -

# Conclusion
Our design process was mostly straightforward. We collaborated and decided what pages we needed and worked from there. After brainstorming and searching we finally decided on a style and background for our UI, later changing our primary color from orange to blue. 

We had some technical difficulties of varying degrees. In the early stages we had issues with our table, making it look good and also dynamically 
As with all group projects we would occasionally run into scheduling conflicts,teammates would be busy for ceratin periods, etc but we were able to communicate and work around each others' availabilities. One thing we would have liked to know ahead of time was to review class content as they were often times very applicable to our project/project checkpoints. This could have helped workload management and generally made our workflow smoother. 

This project was a journey with various bumps and challenges along the way and we are satisfied with our results. 

# Link
https://sentiment-analyzer-team-nu.herokuapp.com/
