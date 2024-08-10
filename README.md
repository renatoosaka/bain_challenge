# Bain Challenge

## Coding Part

This project is a Distance Calculator. It was built with NextJS. It calculates the distance between two addresses using the Haversine formula. The results are saved in a SQLite database using Turso service (https://turso.tech). The application is containerized with Docker for easy deployment.

URL for online web app: [https://bain-challenge-eight.vercel.app/](https://bain-challenge-eight.vercel.app/)

### Features

- Calculating Distance:

  The application calculates the as the crow flies distance using the Haversine formula. This formula determines the shortest distance between two points on a sphere, measured along the surface of the sphere. For more information, you can refer to the [Wikipedia article on the Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula). Credit for Harversine formula implementation on JavaScript [medium article](https://henry-rossiter.medium.com/calculating-distance-between-geographic-coordinates-with-javascript-5f3097b61898).

- History:

  The URL http://localhost:3000/history lists the saved data with the following columns:

  - Source Address
  - Destination Address
  - Distance
  - Created at

### Prerequisites

- Node.js (version 18 or higher)
- Docker (if you choose to run the project with Docker)
- Turso free account

### Project Setup

#### Without Docker

1. **Clone the repository**

   ```bash
   git clone https://github.com/renatoosaka/bain_challenge.git
   cd bain_challenge
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. setup database

   3.1. create a turso free account at https://turso.tech/

   3.2. run the following SQL command to create the table

   ```sql
     CREATE TABLE history (
         id TEXT PRIMARY KEY,
         source TEXT NOT NULL,
         destination TEXT NOT NULL,
         distance REAL NOT NULL,
         created_at TEXT NOT NULL DEFAULT (datetime('now'))
     );
   ```

   3.3. setup your .env

   ```
     TURSO_DATABASE_URL='libsql://<turso-project-name>.turso.io'
     TURSO_AUTH_TOKEN=<turso-auth-token>
   ```

4. Run the development server:

```bash
npm run dev
```

- The application will be running at `http://localhost:3000`.

5. Build and run the production server

```bash
npm run build
npm run start
```

- The production server will be running at `http://localhost:3000`.

#### With Docker

1. setup database

   1.1. create a turso free account at https://turso.tech/

   1.2. run the following SQL command to create the table

   ```sql
     CREATE TABLE history (
         id TEXT PRIMARY KEY,
         source TEXT NOT NULL,
         destination TEXT NOT NULL,
         distance REAL NOT NULL,
         created_at TEXT NOT NULL DEFAULT (datetime('now'))
     );
   ```

   1.3. setup your .env

   ```
     TURSO_DATABASE_URL='libsql://<turso-project-name>.turso.io'
     TURSO_AUTH_TOKEN=<turso-auth-token>
   ```

2. Build the Docker image

```bash
docker build -t bain_challenge --no-cache .
```

3. Run the Docker container

```bash
docker run --name bain_challenge -p 3000:3000 -d bain_challenge
```

- The application will be running at `http://localhost:3000`.

4. Stop and remove the Docker container (optional)

- To stop the container:

```bash
docker stop bain_challenge
```

- To remove the container:

```bash
docker rm bain_challenge
```

5. View logs of the Docker container:

```bash
docker logs bain_challenge
```

## Questions

**Question #1**

> 1. Tell us what pieces of software you think are necessary to develop for the working prototype and how they are related. We call each application (web, mobile or desktop), each API, each batch process that can be deployed independently a piece of software. Support yourself with a diagram if you think necessary.

**Answer**

In order to develop the working prototype, I believe it will be necessary to develop 3 pieces of software:

- Frontend: The frontend will be responsible for all user interaction with the system.
- Backend: The backend will be responsible for all the system's business logic.
- Database: The database will be responsible for storing all the system's information,.
- Messaging: Messaging will be responsible for all communication between the systems.

  ![napkin-selection](https://github.com/user-attachments/assets/146eb5ba-8659-404c-9745-d8ee66aa5814)


**Question #2**

> 2. Tell us about the type of architecture you chose for question (1). Monolithic? Micro-services? Any intermediate? Other? Comment on what you based to make this decision.

**Answer**

For the development of the working prototype, I believe that the best architecture to use is the micro-services architecture, because with this architecture we can have greater flexibility and scalability, and with this we can develop faster and with higher quality.
At first we can start with a less complex approach, with a few micro-services, and over time we can evolve and add more micro-services as the project requires.
In this way we can have teams working independently, with the programming language that best suits each micro-service, and with this we can achieve faster and higher quality development.

**Question #3**

> 3. Describe the work methodology you would use for development. It can be some known methodology (Scrum, XP, RUP), an adaptation, or a mixture between several methodologies. Whatever your experience has shown you works. Tell us why you think this form is appropriate for our problem.

**Answer**

I recommend using the Scrum methodology following certain rites such as daily meetings, 2 weeks sprint, planning, review and retrospective.
With this methodology we are able to closely monitor what is being done on the project, and with this we are able to identify where to direct the work effort, identifying where we can add the most value to the project and the client.

**Question #4**

> 4. Describe the workflow you would use to collaborate using Git. As with (3), you can use something familiar or an adaptation.

**Answer**

We're going to follow the Git Flow pattern, we'll have the main branch for all the productive code, the staging branch which will be the final validation environment before sending it to the productive environment and finally the development environment, develop, where the releases to be developed will be integrated.
environment, where the releases to be developed will be integrated.
Each release will have a specific branch which, when finished, will be integrated into develop to validate the integration with all the code that is still in development, and after validation will be integrated into the staging branch for final validation.
Hotfixes will be dealt with directly in the main branch and after correction will be integrated into the staging and develop branches.

**Question #5**

> 5. Do you think it is necessary to add any extra member to the team during the development of the prototype? What would your role be? Do you think it would be necessary to add new members after the prototype phase? When and why?

**Answer**

For this first phase of the project, I don't think it's necessary to add new members; I believe that with the current team we can deliver the project with quality and on time.
After the prototyping phase, I believe it is necessary to add a member to the development team, so that we can have a faster and higher quality development, and a member to the testing team, so that we can guarantee the quality of the project.
It is also important to add a member to the DevOps team, so that we can have a more stable and secure development and production environment, and another very important member that should be present from the start is the QA to carry out more advanced tests.

**Question #6**

> 6. What other considerations would you have to make the development process robust and efficient?

**Answer**

To make the development process more robust and efficient, it is important that we have a well-defined and stable development and production environment, so that we can guarantee that the code being developed is being tested in an environment that is as close as possible to the production environment.
It is also important that we have an automated testing environment, so that we can guarantee the quality of the code being developed, and thereby ensure that the code being developed is being tested efficiently and quickly.
Another important point is the documentation of the code. It is important that we have clear and objective documentation, so that we can guarantee that the code being developed is being documented correctly and efficiently.
It is also important that we have a continuous integration environment, so that we can ensure that the code being developed is being integrated efficiently and quickly, and thereby ensure that the code being developed is being integrated efficiently and quickly.
Finally, it is important that we have a monitoring environment, so that we can ensure that the code that is being developed is being monitored efficiently and quickly, and thereby ensure that the code that is being developed is being monitored efficiently and quickly.
