# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## Downloading

```
git clone https://github.com/LeanidRymkevich/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install --force
```

## or using Docker

```
docker-compose up
```

## To scan images

```
npm run docker-vulnerabilities:app
```

```
npm run docker-vulnerabilities:db
```

## Running application
Create a .env based of .env.example in the same directory. Then:

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization (not done yet)

```
npm run test:auth
```

To run only specific test suite with authorization  (not done yet)

```
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```

## App description

### Resources

**The application operates with the following resources:**

- `User` (with attributes):
  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Artist` (with attributes):
  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

- `Track` (with attributes):
  ```typescript
  interface Track {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
  ```

- `Album` (with attributes):
  ```typescript
  interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
  }
  ```

- `Favorites` (with attributes):
  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

### Details

* `Users` (`/user` route)
  * `GET /user` - get all users
    - Server answers with `status code` **200** and all users records
  * `GET /user/:id` - get single user by id
    - Server answers with `status code` **200** and and record with `id === userId` if it exists
    - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  * `POST /user` - create user (following DTO is used)
    `CreateUserDto`
    ```typescript
        interface CreateUserDto {
          login: string;
          password: string;
        }
    ```
      - Server answers with `status code` **201** and newly created record if request is valid
      - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /user/:id` - update user's password
    `UpdatePasswordDto` (with attributes):
    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // previous password
      newPassword: string; // new password
    }
    ```
    - Server answers with` status code` **200** and updated record if request is valid
    - Server answers with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answers with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server answers with` status code` **403** and corresponding message if `oldPassword` is wrong
  * `DELETE /user/:id` - delete user
    - Server answers with `status code` **204** if the record is found and deleted
    - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

* `Tracks` (`/track` route)
  * `GET /track` - get all tracks
    - Server answers with `status code` **200** and all tracks records
  * `GET /track/:id` - get single track by id
    - Server answers with `status code` **200** and and record with `id === trackId` if it exists
    - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  * `POST /track` - create new track
  `CreateTrackDto`
    ```typescript
        interface CreateTrackDto {
          name: string;
          artistId: string | null;
          albumId: string | null;
          duration: number;
        }
    ```
    - Server answers with `status code` **201** and newly created record if request is valid
    - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /track/:id` - update track info
  `UpdateTrackDto` - the same as `CreateTrackDto`
    - Server answers with` status code` **200** and updated record if request is valid
    - Server answers with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answers with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  * `DELETE /track/:id` - delete track
    - Server answers with `status code` **204** if the record is found and deleted
    - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

* `Artists` (`/artist` route)
  * `GET /artist` - get all artists
    - Server answers with `status code` **200** and all artists records
  * `GET /artist/:id` - get single artist by id
    - Server answers with `status code` **200** and and record with `id === artistId` if it exists
    - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  * `POST /artist` - create new artist
  `CreateArtistDto`
    ```typescript
        interface CreateArtistDto {
          name: string;
          grammy: boolean;
        }
    ```
    - Server answers with `status code` **201** and newly created record if request is valid
    - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /artist/:id` - update artist info
  `UpdateArtistDto` - the same as `CreateArtistDto`
    - Server answers with` status code` **200** and updated record if request is valid
    - Server answers with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - Server answers with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
  * `DELETE /artist/:id` - delete album
    - Server answers with `status code` **204** if the record is found and deleted
    - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

* `Albums` (`/album` route)
  * `GET /album` - get all albums
    - Server answers with `status code` **200** and all albums records
  * `GET /album/:id` - get single album by id
    - Server answers with `status code` **200** and and record with `id === albumId` if it exists
    - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  * `POST /album` - create new album
  `CreateAlbumDto`
    ```typescript
        interface CreateAlbumDto {
          name: string;
          year: number;
          artistId: string | null;
        }
    ```
    - Server answers with `status code` **201** and newly created record if request is valid
    - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  * `PUT /album/:id` - update album info
  `UpdateAlbumDto` - the same as `CreateAlbumDto`
    - Server answers with` status code` **200** and updated record if request is valid
    - Server answers with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answers with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  * `DELETE /album/:id` - delete album
    - Server answers with `status code` **204** if the record is found and deleted
    - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

* `Favorites`
  * `GET /favs` - get all favorites
    - Server answers with `status code` **200** and all favorite records (**not their ids**), split by entity type:
    ```typescript
    interface FavoritesResponse{
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```
  * `POST /favs/track/:id` - add track to the favorites
    - Server answers with `status code` **201** and corresponding message if track with `id === trackId` exists
    - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answers with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
  * `DELETE /favs/track/:id` - delete track from favorites
    - Server answers with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if corresponding track is not favorite
  * `POST /favs/album/:id` - add album to the favorites
    - Server answers with `status code` **201** and corresponding message if album with `id === albumId` exists
    - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answers with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
  * `DELETE /favs/album/:id` - delete album from favorites
    - Server answers with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if corresponding album is not favorite
  * `POST /favs/artist/:id` - add artist to the favorites
    - Server answers with `status code` **201** and corresponding message if artist with `id === artistId` exists
    - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answers with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
  * `DELETE /favs/artist/:id` - delete artist from favorites
    - Server answers with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    - Server answers with `status code` **404** and corresponding message if corresponding artist is not favorite

`User`'s password is excluded from server response.