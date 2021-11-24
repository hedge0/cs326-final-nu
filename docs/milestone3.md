# Documentation of our database
instead of using MongoDB, our group used DyanmoDB. We had this checked off by professor Berger and the TA's and they gave us the thumbs up for it.
 We chose to use dynamoDB as we are also using aws-sdk so it seemed logical and more fluid to use DyanmoDB. 
 We made a crud.js file to implement all our create,retreive/get,update, and delete operations for our db. 
 This was then exported to  server.js and utilized for our incoming operation actions.
# breakdown of labor
* Group

* Benjamin Rao brao980 
    implemented 
* Andrew Sun asun2
    - implemented server connection to database for user authentication with crud functions that elias made.
    - some error handling on client side
    - implemented a function to convert json arrays to csv format.
    - implemented a download button by saving userlogs as a csv file.
    - bug fixes that I found

* Elias Martin hedge0
    - fixed client / server issues from milestone 2 (fetch requests and express server werent communicating properly).
    - fixed client side to better incorperate server side data.
    - implemented AWS Comprehend api in backend.
    - implemented skeleton crud functions via dynamodb for ben and andrew to use in the server.
    - brushed up extra bugs I found.
