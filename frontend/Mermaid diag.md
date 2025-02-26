sequenceDiagram
    participant Client as Client
    participant Auth as API d'authentification
    participant DB as Base de données
    participant Ressource as API protégée

    %% Phase d'authentification
    Client->>Auth: POST /login (body:{username, passwod})
    Auth->>DB: Vérifier l'existence de l'utilisateur
    DB-->>Auth: Informations utilisateur
    alt Identifiants valides
        Auth->>Auth: Générer le JWT(Acces token et Refresh token)
        Auth->>Auth: Met le Refresh token du JWT dans le cookie
        Auth-->>Client: Retourner le JWT ({token: "token", type:"Bearer"})
    else Identifiants invalides
        Auth-->>Client: Retourner une erreur d'authentification
    end

    %% Phase d'autorisation
    Client->>Auth: GET/POST/PUT .. /protégée (JWT dans l'en-tête)(Header:{token:"bearer token"})
    Auth->>Auth: Valider le JWT (signature, expiration) et verifie le role de l'utilisateur
    alt JWT valide
        Auth-->>Ressource: Accede au ressource protégée
        Ressource-->>Client: Retourner la ressource protégée
    else JWT invalide ou expiré
        Auth-->>Client: Retourner une erreur d'autorisation
    end





sequenceDiagram
    participant U as Utilisateur
    participant API as API Protégée
    participant BDD as Base de données
    participant MI as Moteur d'inférence

    %% Création du cas et ajout des informations
    U->>API: Créer un cas
    API->>BDD: Enregistrer le cas
    API-->>U: Confirmation création cas

    U->>API: Ajouter détails patient
    API->>BDD: Mettre à jour détails patient
    API-->>U: Confirmation détails patient

    U->>API: Ajouter symptômes
    API->>BDD: Mettre à jour symptômes
    API-->>U: Confirmation symptômes

    U->>API: Ajouter analyse
    API->>BDD: Mettre à jour analyse
    API-->>U: Confirmation analyse

    %% Demande de diagnostic
    U->>API: Demander un diagnostic
    API->>BDD: Récupérer cas (détails, symptômes, analyse)
    BDD-->>API: Renvoi des données du cas
    API->>MI: Transmettre données pour diagnostic
    MI-->>API: Diagnostic suggéré
    API->>BDD: Enregistrer diagnostic
    API-->>U: Retour diagnostic

    %% Demande de traitement (pour rôle médecin)
    alt Rôle Médecin
        U->>API: Demander un traitement
        API->>BDD: Récupérer cas (détails, symptômes, analyse)
        BDD-->>API: Renvoi des données du cas
        API->>MI: Transmettre données pour traitement
        MI-->>API: Traitement suggéré
        API->>BDD: Enregistrer traitement
        API-->>U: Retour traitement
    else Autre rôle
        U-->>API: Demande non autorisée
    end

    %% Suppression du cas
    U->>API: Supprimer le cas
    API->>BDD: Supprimer le cas
    API-->>U: Confirmation suppression


flowchart TD
    A[Début] --> B[Saisir les identifiants]
    B --> C[Envoyer requête POST /login]
    C --> D[Vérifier identifiants dans la base de données]
    D --> E{Identifiants valides ?}
    E -- Oui --> F[Générer le JWT]
    F --> G[Retourner le JWT au client]
    G --> H[Fin]
    E -- Non --> I[Retourner erreur d'authentification]
    I --> H[Fin]


flowchart TD
    subgraph Client
        A[" Navigateur<br>(Mobile ou Desktop)"]
    end

    subgraph Reseau
        LB["Load Balancer/Proxy<br>(Nginx)"]
    end

    subgraph Serveur
        subgraph Docker_Host
            B["Conteneur<br>Mongo Express <br>(UI pour MongoDB)"]
            C["Conteneur<br>Frontend React"]
            E["Conteneur Backend<br>(FastAPI, Systeme Expert)"]
            D["Conteneur Base de données<br>(MongoDB)"]
        end
    end

    A --> LB
    LB --> B
    LB --> C
    C --> E
    B --> D
    E --> D
