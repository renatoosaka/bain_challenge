# Bain Challenge

## Coding Part

This project is a Distance Calculator. It was built with NextJS. It calculates the distance between two addresses using the Haversine formula. The results are saved in a SQLite database using Turso service (https://turso.tech). The application is containerized with Docker for easy deployment.

URL for online web app: [https://bain-challenge-eight.vercel.app/](https://bain-challenge-eight.vercel.app/)

### Features

- Calculating Distance:

  The application calculates the distance using the Haversine formula. This formula determines the shortest distance between two points on a sphere, measured along the surface of the sphere. For more information, you can refer to the [Wikipedia article on the Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula). Credit for Harversine formula implementation on JavaScript [medium article](https://henry-rossiter.medium.com/calculating-distance-between-geographic-coordinates-with-javascript-5f3097b61898).

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

> 1. Tell us what pieces of software you think are necessary to develop for the working prototype and how they are related. We call each application (web, mobile or desktop), each API, each batch process that can be deployed independently a piece of software. Support yourself with a diagram if you think necessary.

For the prototype we will use a monolith, where we will have a Web Application Firewall (WAF), Load Balancer (LB), the application instances, and finally the database.

![image](https://github.com/user-attachments/assets/45a5f782-1110-4eba-9e6a-2fba1bcb6464)

For the second phase of the project, we'll adopt a microservices architecture, where we'll have a Web Application Firewall (WAF), Load Balancer (LB), at first the Order, Delivery, Payment and KDS microservices and the database.

![image](https://github.com/user-attachments/assets/d4102e68-9d5a-4c02-866b-11b6ed0994c0)


> 2. Tell us about the type of architecture you chose for question (1). Monolithic? Micro-services? Any intermediate? Other? Comment on what you based to make this decision.

For the first phase of the project (prototype), we're going to use a monolithic approach, which will save time in the development and actual testing of the project. As it has a simpler deployment and development than a microservices architecture, we'll have a reduced architecture cost and we'll be able to get the project online in a short time, so we'll have data to analyze the project's acceptance and direction.
In this structure we will have the security layer, load balancer, application containers and the database.

After the prototype phase and the success of the project, we can identify which parts of the project (services) require the most processing, at which times we have the most demand and the stress load, so we can start planning and adopting a microservices architecture.
Among the services we can first identify Order, Delivery, Payment, KDS.

> 3. Describe the work methodology you would use for development. It can be some known methodology (Scrum, XP, RUP), an adaptation, or a mixture between several methodologies. Whatever your experience has shown you works. Tell us why you think this form is appropriate for our problem.

I would recommend using the Scrum methodology, as it provides a structured yet flexible framework for managing development. Key practices include daily stand-ups, two-week sprints, and regular planning, review, and retrospective meetings.

This approach allows the team to closely track progress and adapt quickly to any changes or challenges that arise. By breaking down the work into manageable sprints, we can prioritize tasks effectively and focus on delivering the highest value to the project and the client. The regular feedback loops also help ensure continuous improvement and alignment with project goals.

> 4. Describe the workflow you would use to collaborate using Git. As with (3), you can use something familiar or an adaptation.

For collaboration using Git, I would recommend using the Gitflow workflow with some adaptations to suit the team's needs.

- Main Branches:

  - main branch: This branch contains the production-ready code. It only receives changes from the develop branch when a feature is fully tested and ready for release.
  - develop branch: This branch is the integration branch for features. All new feature branches are merged into develop, where integration and testing happen before moving to main.

- Supporting Branches:

  - Feature branches: For each new feature or task, a new branch is created from develop. The naming convention is typically feature/feature-name, which helps in keeping track of what's being worked on.
  - Hotfix branches: In case of a bug found in production, a hotfix branch is created from main. After the fix is made, it's merged back into both main and develop to ensure the issue is resolved in both production and ongoing development.
    Release branches: When the develop branch is ready for a new release, a release branch is created. This branch is used for final testing and polishing before merging into main and tagging a new release.

- Collaboration Workflow:
  - Pull Requests (PRs): All changes should be submitted via pull requests. This allows for code review, discussion, and approval before merging into develop or main. PRs should be small and focused to keep the review process efficient.
  - Code Reviews: Every PR should be reviewed by at least one other team member. This ensures that code quality is maintained and allows for knowledge sharing across the team.
  - Continuous Integration (CI): Automated tests should be run on every PR and before merging into the develop or main branches. This helps catch issues early and ensures that the codebase remains stable.
  - Branch Protection Rules: To enforce this workflow, branch protection rules can be applied to the main and develop branches, requiring PRs and passing tests before any changes can be merged.

This Gitflow-inspired workflow ensures that development is organized, collaboration is smooth, and the codebase remains stable, allowing us to deliver high-quality software efficiently.

> 5. Do you think it is necessary to add any extra member to the team during the development of the prototype? What would your role be? Do you think it would be necessary to add new members after the prototype phase? When and why?

For the first phase of the project, I would add a quality tester to carry out all the advanced tests and also a UI/UX specialist to provide the best possible user experience.
Once we've moved on to the next phase where we've decided to take the project forward, we'll need to add another developer and a person who specializes in architecture/devops to ensure the success of our microservices.

> 6. What other considerations would you have to make the development process robust and efficient?

To make the development process robust and efficient, I’d focus on a few key areas:

- Automated Testing: Set up automated tests to catch bugs early and ensure the code works as expected. This includes unit, integration, and end-to-end tests.
- CI/CD: Implement continuous integration and continuous deployment pipelines so that every code change is tested, validated, and automatically deployed if it passes. This speeds up delivery and reduces errors.
- Code Quality: Regular code reviews help maintain quality and share knowledge within the team. Tools for consistent coding styles and good documentation are also crucial.
- Agile Practices: Follow agile practices like daily stand-ups, sprint planning, and retrospectives to keep the team aligned and the work organized.
- Infrastructure and DevOps: Use infrastructure as code to ensure everything is consistent and reproducible. Monitoring and logging are essential for keeping track of the application's performance and health.
- Security: Write secure code, conduct regular security audits, and keep dependencies up to date to protect the application.
- These practices help create an efficient, secure, and reliable development process that consistently delivers high-quality software.
