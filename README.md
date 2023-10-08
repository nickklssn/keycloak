# Keycloak
Dieses Repository beinhaltet den Code für das im Rahmen des Praxisprojekts behandelte Thema "Keycloak als OpenID-Provider zum Schutz von APIs"


## Voraussetzungen
- Docker ist installiert
- Node.js (18.15.0 oder höher)
- Folgendes Mapping in der Host-Datei auf dem Rechner wurde vollzogen:

  ```
   127.0.0.1 api.local
   127.0.0.1 webapp.local
   ```
Anmerkung: Der Pfad zur Host-Datei ist vom jeweiligen Betriebssystem abhängig. Bei Windows:
```C:\Windows\System32\drivers\etc```.
Damit werden Probleme beim Ausstellen eines Access Token vermieden.

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
3. Docker-Container für Keycloak und Datenbank erstellen (im Root-Verzeichnis)
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

## Konfiguration in Keycloak
Durch die Erstellung der Docker-Container ist Keycloak unter ```localhost:8080``` aufrufbar.
Benutzername und Passwort für die Admin-Konsole sind jeweils ```admin``` .

1. **Erstellung eines Realm<br />**
   Schaltfläche oben links anklicken und dann auf "Create Realm" gehen. Beliebigen Namen auswählen und auf "Create" klicken.

2. **Erstellung eines Clients<br />**
   Links im Auswahlmenü auf Clients und anschließend "Create Client" klicken. "Client type auf "OpenID Connect" setzen und      dem Client eine "Client ID" vergeben. Die "Client authentication" auf "On" setzen. Anschließend für die "Login settings"     folgende URLs bzw. URIs setzen:
   ```shell
    Root URL: http://webapp.local:3000
    Home URL: http://webapp.local:3000
    Valid redirect URIs: /login/cb
    Valid post logout redirect URIs: /*
   ```
3. **Erstellung von Benutzern<br />**
   Links im Auswahlmenü auf User und anschließend "Add user" klicken. Dem Benutzer einen "Username" und für die       
   Unterscheidung einen "Firstname" und "Lastname" vergeben. Anschließend unter dem Reiter "Credentials" ein neues **nicht** 
   temporäres Passwort vergeben.

4. **Erstellung von Benutzerrollen<br />**
   Links im Auswahlmenü auf Realm roles und anschließend "Create role" klicken. Jeweils eine Rolle für "app-user" und "app- 
   admin" erstellen.
   
5. **Zuweisung der Benutzerrollen<br />**
   Links im Auswahlmenü auf Users und einen Benutzer anklicken, dem eine Rolle zugewiesen werden soll. Anschließend unter 
   dem Reiter "Role mapping" und danach "Assign role" dem Benutzer die gewünschte Rolle zuweisen.

6. **Lebensdauer des Access Token anpassen<br />**
   Links im Auswahlmenü auf Realm settings und anschließend auf Tokens klicken. Unter dem Punkt "Access tokens" die Option "Access 
   Token Lifespan" auf 1 Minute setzen. Dies erlaubt ein schnelleres Erneuern des Access Token.
   



## Umgebungsvariablen
  Um Variablen, wie bspw. das Client secret, zu schützen, wurde für das Projekt eine ```.env```-Datei angelegt. Im Folgenden   ein Template für diese Datei, die im Root-Verzeichnis des Repositorys angelegt werden muss:

  ```
PORT = 3000
WELLKNOWN_CONFIG = "http://localhost:8080/realms/YOUR-REALM/.well-known/openid-configuration"
CLIENT_ID = "YOUR-CLIENT_ID"
CLIENT_SECRET = "YOUR-CLIENT_SECRET"
REDIRECT_URI = "http://webapp.local:3000/login/cb"
RESPONSE_TYPES = 'code'
ID_TOKEN_SIGNING_ALG_VALUES_SUPPORTED = "RS256"
```
Anmerkung: Die in Großbuchstaben hinterlegten Bezeichnungen durch die eigenen Bezeichnungen ersetzen.


   
   
   
   
   


     
   
   
   
   
