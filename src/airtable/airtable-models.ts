/*
curl -X POST "https://api.airtable.com/v0/meta/bases" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "name": "Apartment Hunting",
    "tables": [
      {
        "description": "A to-do list of places to visit",
        "fields": [
          {
            "description": "Name of the apartment",
            "name": "Name",
            "type": "singleLineText"
          },
          {
            "name": "Address",
            "type": "singleLineText"
          },
          {
            "name": "Visited",
            "options": {
              "color": "greenBright",
              "icon": "check"
            },
            "type": "checkbox"
          }
        ],
        "name": "Apartments"
      }
    ],
    "workspaceId": "wspmhESAta6clCCwF"
  }'
*/
