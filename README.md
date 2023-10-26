# nap-queen-backend

Backend API for Nap Queen

This document provides information about a set of APIs for managing a blog, including creating, retrieving, updating, and deleting blog posts, as well as fetching the latest blog posts from each unique category.

## 1. Retrieve All Blog Posts

### Endpoint: GET /api/posts

Retrieve a list of all blog posts.

**Response:**

Status: 200 OK

```json
[
  {
    "id": "653a0181460f107ce5d3deac",
    "title": "Amazing Blog",
    "content": "This is an amazing blog API created by Kavita Gupta",
    "category_id": "6539fec48da5f370d72a508a",
    "created_at": "2023-10-26T06:04:49.498Z",
    "updated_at": "2023-10-26T06:04:49.498Z"
  }
]
```

## 2. Retrieve a Specific Blog Post

### Endpoint: GET /api/posts/:id

Retrieve a specific blog post by its ID. It includes the category of the blog post in the response.

**Request:**

GET /api/posts/:id

**Response:**

Status: 200 OK

```json
{
  "id": "653a06c8d94121251a3e2c80",
  "title": "Amazing Blog - now update this",
  "content": "This is for me to update",
  "category_id": "6539ff325feac4aa49717623",
  "created_at": "2023-10-26T06:27:20.904Z",
  "updated_at": "2023-10-26T06:27:20.904Z",
  "category": "Category2"
}
```

## 3. Create a New Blog Post

### Endpoint: POST /api/posts

Creates a new blog post. The request body should contain title, content, and category_id.

**Request:**

POST /api/posts

Content-Type: application/json

| Field         | Description         | Required |
| ------------- | ------------------- | -------- |
| `title`       | Title of the Post   | Yes      |
| `content`     | Content of the Post | Yes      |
| `category_id` | Valid Category Id   | Yes      |

```json
{
  "title": "Amazing Blog 1",
  "content": "This is for documentation to see",
  "category_id": "6539ff325feac4aa49717623"
}
```

**Response:**

Status: 200 OK

```json
{
  "title": "Amazing Blog 1",
  "content": "This is for documentation to see",
  "category_id": "6539ff325feac4aa49717623",
  "id": "653a33e5c3fc9dd6e92fe69c",
  "created_at": "2023-10-26T09:39:49.696Z",
  "updated_at": "2023-10-26T09:39:49.696Z"
}
```

Status: 400 Bad Request

```json
{
  "error": "Invalid category_id"
}
```

## 4. Update an Existing Blog Post

### Endpoint: PUT /api/posts/:id

Updates an existing blog post by its ID. The request body should contain title and content.

**Request:**

PUT /api/posts/:id

Content-Type: application/json

| Field     | Description                 | Required |
| --------- | --------------------------- | -------- |
| `title`   | Updated title of the Post   | Yes      |
| `content` | Updated content of the Post | Yes      |

```json
{
  "title": "Amazing Blog - Testing - Category 1",
  "content": "This is an example of Category 1 for you to see"
}
```

**Response:**

Status: 200 OK

```json
{
  "id": "653a0181460f107ce5d3deac",
  "title": "Amazing Blog - Testing - Category 1",
  "content": "This is an example of Category 1 for you to see",
  "category_id": "6539fec48da5f370d72a508a",
  "created_at": "2023-10-26T06:04:49.498Z",
  "updated_at": "2023-10-26T10:05:25.662Z"
}
```

## 5. Delete a Blog Post

### Endpoint: DELETE /api/posts/:id

Deletes a blog post by its ID.

**Request:**

DELETE /api/posts/:id

**Response:**

Status: 200 OK

```json
{
  "status": "success"
}
```

## 6. Retrieve Latest Blog Posts by Category

### Endpoint: GET /api/posts/latest

Retrieves the latest blog post from each unique category.

**Request:**

GET /api/posts/latest

**Request Header:**

x-api-key: YOUR_API_KEY

| Field       | Description                | Required |
| ----------- | -------------------------- | -------- |
| `x-api-key` | API key for authentication | Yes      |

**Response:**

Status: 200 OK

```json
[
  {
    "id": "653a33e5c3fc9dd6e92fe69c",
    "title": "Amazing Blog 1",
    "content": "This is for documentation to see",
    "created_at": "2023-10-26T09:39:49.696Z",
    "updated_at": "2023-10-26T09:39:49.696Z",
    "category": "Category2"
  },
  {
    "id": "653a0694d94121251a3e2c7d",
    "title": "Amazing Blog - now delete this",
    "content": "This is for me to delete",
    "created_at": "2023-10-26T06:26:28.080Z",
    "updated_at": "2023-10-26T06:26:28.080Z",
    "category": "Category1"
  },
  {
    "id": "653a0685d94121251a3e2c79",
    "title": "Amazing Blog - evaluator please delete this",
    "content": "This is for evaluator to delete",
    "created_at": "2023-10-26T06:26:13.196Z",
    "updated_at": "2023-10-26T06:26:13.196Z",
    "category": "Category3"
  }
]
```

---

## General Validation Response for request parameters and body

### Endpoint: POST /api/posts

Creating a post with invalid key `titl` instead of `title`.

**Request:**

```json
{
  "titl": "Amazing Blog Post 2 Category 2",
  "content": "This is for me to see",
  "category_id": "6539ff325feac4aa49717623"
}
```

**Response:**

Status: 400 Bad Request

```json
{
  "errors": {
    "message": "\"title\" is required, \"titl\" is not allowed",
    "err": {
      "name": "Bad Request",
      "status": 400
    }
  }
}
```

---

To Run the code

`npm run start`

To run the tests

`npm run test`

To get the code coverage

`npm run coverage`

To get the coverage report

`npm run report`
