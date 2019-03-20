# revOS Assignment

This repository contains backend and frontend for revOS Assignment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following softwares and libraries installed before setting up the project.

   1. [NodeJs]( https://nodejs.org/en/download/)
   2. [MongoDB]( https://www.mongodb.com/download-center/community)
   3. [Node Package manager]( https://www.npmjs.com/get-npm)
   4. [ReactJS](https://reactjs.org/docs/create-a-new-react-app.html)

### Installing

      1. Clone the repository to your local machine.

               git clone https://github.com/himanshudahiya/revOS.git

After finishing the installation of the required softwares and libraries, navigate to the root folder of the project.

Project contains two folder, **revOS_backend** and **revos_dash**.

**revOS_backend** is an NodeJS and Express Project which contains backend and APIs of the project.

**revos_dash** is an ReactJS project which contains UI of the project.

      2. Open A terminal in the root folder of the project and type the following command :

              cd revOS_backend/

      > You will go into backend directory.

      3. Now type in the following command :

              mongod --dbpath data/

      > This will start mongodb session.

      4. Open a new terminal in same repository and type in following command to install required node modules :

              npm install

      > This will install required node modules.

      5. After successfully installing required modules, type following command to start the backend server :

              npm start

      > This will start backend server on default port 3000. Change that in server.js file to run on different port.

      6. Open another terminal in root directory of project and navigate to revos_dash to access frontend :

      Type in following command to install required node modules for frontend :

            npm install

      7. After installation, type in following commands to start react server :

            npm start

      > This will start frontend server at default port 3000. If this port is already in use, react will automatically ask for other port to run on.

## Features
The backend contains API for the given dataset.

Frontend displays the result of these api with few other functionalities.


## Api Lists and parameters

####    1. loadcsv

        Will load the csv dataset file into mongodb Database.

        Request address :   server_address/home/loadcsv
        Request type    :   GET
        Return Data     :   If successful, will return a JSON object with following elements :
            1. success: Boolean value which tells if the import was successful.
            2. message: String with Data import successful message.

        If unsuccessful, returns a JSON object with following elements:
          1. success: false
          2. error: Error message


####    2. getData

        Will return all the data from the database table.

        Request address :   server_address/home/getData
        Request type    :   GET
        Return Data     :   If successful, will return a JSON object with following elements :
            1. success: Boolean value which tells if the import was successful.
            2. bike_details: Array of objects of each record.

        If unsuccessful, returns a JSON object with following elements:
          1. success: false
          2. error: Error message


####     3. getStations

         Will return all the stations from the database.

         Request address :   server_address/home/getStations
         Request type    :   GET
         Return Data     :   If successful, will return a JSON object with following elements :
             1. success: Boolean value which tells if the import was successful.
             2. station: Array of objects containing Station ID, Station Name and its position.

         If unsuccessful, returns a JSON object with following elements:
           1. success: false
           2. error: Error message


####     4. getStationDetails

         Will return details regarding bikes using that station in a given intervel of time.

         Request address :   server_address/home/getStationDetails
         Request type    :   POST
         Parameters      :   1. stationID :   string - StationID for which we want to check.
                             2. startTime:   string
                             3. endTime :   string
                             4. allData :   Boolean - If we want record objects, set to true, else false.
         Return Data     :   If successful, will return a JSON object with following elements :
             1. success: Boolean value which tells if the import was successful.
             2. count: Count of total bikes using that station.
             3. bikes: If asked for bikes details, this will contain objects of records which satisfies given params.

         If unsuccessful, returns a JSON object with following elements:
           1. success: false
           2. error: Error message


## Frontend
Frontend contains 3 different tabs on nav bar.

        1. Home - Displays all the data in a table use 2nd API.
        2. Map - Displays stations on map as markers using 3rd API. When click on marker, will give its details, like Station Name, total bikes using that station(if time interval specified), and station position. Also gives a button using which we can navigate to different page to check all the bikes details.
        3. Station Table - Displays the details of all the bikes using a given particular station in a given time interval. 


## Authors
**Himanshu Dahiya** 
