### Introduction

This is an API to set an appointment for car inspection.

### Approach

MVC style approach using mongoose. However, this is a resful API, so now view available.
There are 2 controllers and 1 models. 

### Endpoints.

1. GET /api/vehicles (list vehicle lists taken from a json file)
2. POST /api/booking/init (using the car_make, car_model and phone_number to create initial booking)
3. GET /api/booking/centres (list centres with ids)
4. GET /api/booking/slots (list all slots using centre id and shows blocked slots)
5. POST /api/booking/book (API to finally book the appointment. Will return 409 conflict if slots taken)

### License

MIT