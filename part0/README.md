# 0.4: New note diagram

```
sequenceDiagram
    participant browser
    participant server
    
note right of browser: The user enters a note to the form input and clicks on the "Save" button.


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Redirect to location: /exampleapp/notes
    deactivate server

    Note right of browser: HTTP 302 request browser to GET the URL provided in the Location Header

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Markup is easy", "year": "2023" }, ... ]
    deactivate server

    Note right of browser: browser executes the callback function that renders the notes
```

# 0.5: Single page app diagram

```
sequenceDiagram
    participant browser
    participant server
    
    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    deactivate browser

    activate server
    server-->>browser: HTML document
    deactivate server

    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    
    deactivate browser
    server-->>browser: the JavaScript file
    
    deactivate server

    activate browser
      
    Note right of browser: browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    deactivate browser
    
    activate server
    server-->>browser: [{ "content": "Markup is easy", "year": "2023" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
# 0.6: New note in Single page app diagram

```
sequenceDiagram
    participant browser
    participant server
    
note right of browser: The user enters a note to the form input and clicks on the "Save" button.

    note over browser: spa.js adds note to DOM
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note over server: server stores note
    server-->>browser: HTTP 201
    deactivate server

    Note right of browser: Created success indicates request succeeded and resource creation.
```