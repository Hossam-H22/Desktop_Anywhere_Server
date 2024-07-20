# Desktop Anywhere Server


Welcome to the Desktop Anywhere Server! This project serves as the backend for a [Desktop Anywhere](https://github.com/Hossam-H22/DesktopAnyWhere_GP) project that caters to both users and sellers. Built using Node.js, Express, MongoDB, Socket.IO, and Cloudinary, this API provides a secure and efficient way to manage mobile and desktop operations and media uploading.



<br>



## Table of Contents

- [ Introduction. ](#Introduction)
- [ Features. ](#Features)
- [ Technologies Used & Dependencies. ](#Technologies_Used)
- [ Project Structure. ](#Project_Structure)
- [ API Endpoints. ](#API_Endpoints)
- [ Media Upload. ](#Media_Upload)
- [ Feedback and Contributing. ](#Feedback_Contributing)
- [ License. ](#License)



<br>



<a id="Introduction"></a>

## Introduction
This Server aims to provide a robust backend for [Desktop Anywhere](https://github.com/Hossam-H22/DesktopAnyWhere_GP) applications, Desktop Anywhere is a unified software system with mobile and desktop applications that allows seamless remote control of personal computers via touchpad, keyboard, and voice commands in Arabic, with automatic device pairing and high accuracy. 





<br>



<a id="Features"></a>

## Features

- **Real-Time Communication:** Enable mobile and desktop to communicate with each other.
- **Desktop Management:** CRUD operations for managing desktops, including creation, retrieval, updating, and deletion.
- **Mobile Management:** CRUD operations for managing mobiles, including creation, retrieval, updating, and deletion.
- **Media Upload:** Utilize Cloudinary to securely upload and manage files.




<br>



<a id="Technologies_Used"></a>

## Technologies Used & Dependencies
- **Node.js:** A server-side JavaScript runtime used to build fast and scalable network applications.
- **Express:** A minimal and flexible Node.js web application framework that simplifies API development.
- **MongoDB:** A NoSQL database used for efficient and flexible data storage.
- **Cloudinary:** A cloud-based media management platform for uploading, storing, and delivering images and other media.
- **Socket IO:** A library that enables real-time, bidirectional communication between web clients and servers.

For a complete list of dependencies, please refer to the `package.json` file.






<br>



<a id="Project_Structure"></a>

## Project Structure
The project structure follows a modular pattern to enhance maintainability and readability:

* `DB/`
    * `Models/`: Defines MongoDB schemas.
    * `connection.js`: Connect to MongoDB.
* `src/`
    * `middleware/`: Middleware functions for authentication, error handling, etc.
    * `modules/`: Defines API routes and connects them to controllers to perform their business logic.
    * `utils/`: Utility functions for various tasks.
    * `app.router.js`: Main Express application setup.
    * `socket.js`: socket setup and events.



<br>



<a id="API_Endpoints"></a>

## API Endpoints
* **Stun**
  * `GET /stun`: Retrieve a list of stun server URLs.
  * `GET /stun/:id`: Retrieve details of a specific stun server URL.
  * `POST /stun`: Add new stun server URL.
  * `DELETE /stun/:id`: Delete stun server URL.
* **Turn**
  * `GET /turn`: Retrieve a list of turn server URLs.
  * `GET /turn/:id`: Retrieve details of a specific turn server URL.
  * `POST /turn`: Add new turn server URL.
  * `DELETE /turn/:id`: Delete turn server URL.
* **Desktop**
  * `GET /desktop`: Retrieve a list of desktops.
  * `POST /desktop/information`: Retrieve details of a specific desktop with the MAC address sent in the body.
  * `POST /desktop/information/:mobile_id`: Retrieve a list of desktops data that was sent these MAC addresses in the body connected to a specific mobile.
  * `GET /desktop/:ip`: Retrieve details of a specific desktop.
  * `POST /desktop`: Add new desktop data.
  * `DELETE /desktop/:id`: Delete specific desktop.
* **Mobile**
  * `GET /mobile`: Retrieve a list of mobiles.
  * `GET /mobile/:id`: Retrieve details of a specific mobile.
  * `POST /mobile`: Add new mobile data.
  * `DELETE /mobile/:id`: Delete specific mobile.
* **Connection**
  * `GET /connection`: Retrieve a list of connections.
  * `GET /connection/desktop/:desktop_mac`: Retrieve a list of connections for a specific desktop.
  * `GET /connection/mobile/:mobile_id`: Retrieve a list of connections for a specific mobile.
  * `POST /connection`: Create a new connection.
  * `DELETE /connection/:id`: Delete specific connection.
* **Media**
  * `GET /media/data`: Retrieve a list of files.
  * `GET /media/view/:mobile_Id`: Retrieve details of a specific file.
  * `POST /media`: Upload a new file.
  * `DELETE /media/:id`: Delete specific file.


<!-- > Detailed Postman API documentation can be found <a href="https://documenter.getpostman.com/view/23533987/2s9Y5YQh8y" target="_blank">here</a>. -->






<br>



<a id="Media_Upload"></a>

## Media Upload
Cloudinary integration allows for easy and efficient management of media files. Images and other media can be uploaded and linked to their records.



<br>



<a id="Feedback_Contributing"></a>

## Feedback and Contributing
I'm excited to hear your <u><a href="https://forms.gle/mUQJdnGPey1atnzp9" target="_blank">feedback</a></u> and discuss potential collaborations and if you'd like to contribute, please fork the repository, make your changes, and submit a pull request.



<br>



<a id="License"></a>

## License
This project is licensed under the [MIT license](LICENSE).


<br>

