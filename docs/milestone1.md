# Team overview
* Benjamin Rao brao980
* Andrew Sun asun2
* Elias Martin hedge0 

# Innovative Idea 
creating a website which offers 2 parts. The first part will offer a text box for user input. The user will enter any amount of text into the box, and after hitting enter, the backend will return a sentiment score among a few other things like the language of the text for the user inputted comment, as well as log this user inputted text + sentiment results in a database. The second part would display all of the previously logged comments that the user has ever inputted, along with each comment's respective sentiment results, and will also allow the user to delete specific comments from that database on this webpage. 

# Important data
We will be using AWS's pre-trained NLP API to detect the language of the user. Other than that, we will accept data inputted from the user to analyze.

# User Interface 
These are the following pages that will be used for our application:
* Login
    * a typical log in page with a button to sign in with a username and password. there is also a button to create a new account. We'll also make a logo for our site once we get a good concept. 
![alt text](https://user-images.githubusercontent.com/28848384/138577218-4fa42c42-6b79-4d2c-a9f8-10408afc3363.png)
* Signup
    * standard sign up page, sign up button, asks for a username, password and confirmation of the password. There is also a checkbox for showing password. 
 ![alt text](https://user-images.githubusercontent.com/28848384/138577312-c9e80a3f-8a29-4ce4-a217-43dc85f96ac1.png)
* input 
    * this will be the input page of the text where users can put in whatever they want to be analyzed and scored by hitting the anaylze button. In addition there is a sign out button you can sign out of your account which holds a history of inputted text.
  ![alt text](https://user-images.githubusercontent.com/28848384/138577395-88a2c6fd-1d08-46c6-8658-ab0eb40d4e48.png)
* output 
    * this will be the output results page. This page will contain the results/metrics of the rest of the user's history of inputted texts/results previous inputs. There is a sign out button to exit the account and a "analyze again" button that will bring you to the input page to do it once again.
* results
    * This will be the result page. This page will carry all the metrics of the previously inputted text. There is a sign out button to exit the account, an "Analyze More Text" button that will bring the user back to the input page to perform more analysis.
