# Keycloak
Dieses Repository beinhaltet den Code für das im Rahmen des Praxisprojekts behandelte Thema "Keycloak als OpenID-Provider zum Schutz von APIs"


## Voraussetzungen
- Docker ist installiert
- Node.js (18.15.0 oder höher)

## Durchführung
1. Klonen des Repository<br />

   ```shell
   git clone https://github.com/nickklssn/keycloak.git
   ```
2. Installieren der Abhängigkeiten<br />
  
     ```shell
     cd .\keycloak\api
     npm i
     ```
    ```shell
    cd .\keycloak
    npm i
    ```
3. Docker-Container für Keycloak und Datenbank erstellen
    ```shell
    docker compose up
    ```
4. Starten der Web-App und der API
    ```shell
    cd .\keycloak\api
    npm start
     ```
    ```shell
    cd .\keycloak
    npm start
    ```
   
   
   
   
