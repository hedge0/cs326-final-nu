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

Our application uses Amazon Dynamo for the database. In the database we store the user's account credentials along with all of the previous logs of text sent. Our schema is represented below.

# URL routes



# Authentication/Authorization 

# Division of Labor

# Conclusion

# Link

https://sentiment-analyzer-team-nu.herokuapp.com/
