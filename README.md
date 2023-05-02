# Instant Messaging Frontend - Angular

The project aims to emulate the functionality of an instant messaging service (e.g. Discord, Google Workspace), i.e.
being able to create public and private discussions channels, sending and receiving instant messages, organizing
meetings in channels, sending attachements, notifying users of a new message or meeting in one of the channels
they subscribed to.

This frontend application is designed to wire up with the Jakarta EE REST API, developed in parallel.

## Use case

This project is part of Metz Numeric School's curriculum for Software Engineering, and the School acts as the customer,
i.e., expressing needs and specifications.

Metz Numeric School is interested in the benefits of already available instant messaging solutions but wishes for its
data to remain closed to giants like Google or Discord.
The project is designed to help students apply design and programming knowledge on a product that could eventually
be used in production by the school.

## Features

### Planned features
* Authentication and Authorization through JWT
* Displaying Channels
* Allowing users to send and receive messages through WebSockets in the channels in which they are a member of
* Creating private discussion channels
* Creating Meetings and inviting Users to partake in a specific Channel
* Adding File attachements to messages
* Getting notified of new messages and meetings
* Admin view for channels and users administration

## Built With

* [Angular](https://angular.io/)

## Authors

* **AmbryN** - *Initial work* - [AmbryN](https://github.com/AmbryN)
