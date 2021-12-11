# Team Nu

## Sentiment Analyzer

## Semester: Fall 2021

## Overview: About Sentiment Analyzer

Sentiment Analyzer is a web application that gives users the ability to analyze segments of text by Amazon's Comprehend services. Users have the ability to enter a document up to 20 KB in size, and in turn receive sentiment statistics. Users can also choose to update and override these statistics if they choose to, and download their history of submissions. We sought out to bring an easy to use interface around Amazon's Comprehend services.

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
| ```GET /``` | Sends the login page |
| ```POST /signup``` | Handles new user sign up |
| ```POST /login``` | Handles logging in |
| ```POST /analyze/:username``` | Sends body of text and returns sentiment statistics |
| ```UPDATE /updateSentiment/:username ``` | Overrides sentiment score of text in database|
| ```UPDATE /updateLanguage/:username ``` | Overrides language of text in database|
| ```DELETE /delete/:username``` | Deletes the current updated |
| ```GET /getUserLog/:username``` | Retrieves previous user text scores |


# Database

Our application uses Amazon Dynamo for the database. We had this checked off by professor Berger and the TA's and they gave us the thumbs up for it.
 We chose to use dynamoDB as we are also using aws-sdk so it seemed logical and more fluid to use DyanmoDB. In the database we store the user's account credentials along with all of the previous logs of text sent. Our schema is represented below. 

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

* Elias

* Andrew 

* Ben

# Conclusion

The design process was mostly straightforward. We collaborated and decided what pages we needed and worked from there. After brainstorming and searching we finally decided on a style and background for our UI. 


# Link

https://sentiment-analyzer-team-nu.herokuapp.com/
