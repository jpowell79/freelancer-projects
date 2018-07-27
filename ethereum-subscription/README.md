## How to start developing:
1. Setup your local MySQL sever to use the user, password and port specified in [serverSettings.js](./server/serverSettings.js).
2. Start the local MySQL server.
3. `npm run dev`

## Project Structure:
- **Root**: Contains files that can be accessed by both the server and client.
- **Client**: Contains all frontend code. Should never import from the server.
    - **Config**: Files used for the initial client setup.
    - **Containers**: Components designed to primarily contain other components.
    - **Modules**: Components designed to work on any site.
    - **Site-Modules**: Components designed specifically for this site.
    - **Services**: All files which are not a React Component.
- **Server**: Contains all backend code. Should never import from the client.
    - **Config:** Files used for the initial server setup.
    - **Routes:** Defines the REST API.
    - **Models:** Defines all the different database tables.
    - **Services:** Contains other utilities and tools specific to the server.
    
## Database Design:
![alt-text](./markdown/ethereum_er.png)
