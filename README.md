# email-caller-user-info-lambda
An AWS lambda for handling all methods made to the /user-info endpoint.

## API

### GET /user-info?userEmail={email}

#### Example Response
**200 OK**
```json
{
  "id": "48973f3c-d783-4062-a2be-4286e26c041b",
  "email": "test-user@email.com",
  "created": "2019-09-10T00:07:07Z",
  "lastUpdated": "2019-09-09T00:07:07Z",
  "version": "v1.0.0"
}
```

### POST /user-info

#### Example Request
```json
{
  "userEmail": "someone@domain.com"
}
```

#### Example Response
**201 Created**
```json
{
  "id": "7bd4316f-90cc-44d2-96f9-ff488949b448",
  "email": "someone@domain.com",
  "created": "2019-09-09T00:07:07Z",
  "lastUpdated": "2019-09-09T00:07:07Z",
  "version": "v1.0.0"
}
```

### PATCH /user-info?userEmail=${email}

#### Example Request
```json
{
  "userEmail": "new-email@domain.com"
}
```

#### Example Response
**200 OK**
```json
{
  "id": "7bd4316f-90cc-44d2-96f9-ff488949b448",
  "email": "new-email@domain.com",
  "created": "2019-09-09T00:07:07Z",
  "lastUpdated": "2019-09-12T00:07:07Z",
  "version": "v1.0.0"
}
```