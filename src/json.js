export const json = {
  "pages": [
    {
      "name": "page_start",
      "elements": [
        {
          "type": "html",
          "name": "study_program_recommender_info",
          "html": "<article class='intro'>  <h1 class='intro__heading intro__heading--income title'>           ICT-Alan Soveltuvuustesti        </h1>  <div class='intro__body wysiwyg'>     <p>ICT koskettaa meistä jokaista tavalla tai toisella yhä kasvavassa määrin ja siksi ala tarvitsee kaikenlaisten ihmisten näkemystä, kokemusta ja osaamista. Ota sinäkin ensimmäinen askel tulevaisuuteen ja selvitä mikä ICT-alaan liittyvistä Oulun yliopiston tutkinto-ohjelmista voisi olla sinun juttusi.</p> </div> </article>"
        }, {
          "name": "language_selection",
          "title": {
              "en": "Language selection",
              "fi": "Kielen valinta"
          },
          "type": "dropdown",
          "choices": [
	      {
                  value: "en",
                  text: "English"
              }, {
                  value: "fi",
                  text: "Suomi"
              }
          ],
        }, {
          "name": "data_collection_consent",
          "title": {
            "en": "I consent to my answers being stored.",
            "fi": "Hyväksyn että syöttämäni tiedot tallennetaan."
          },
          "type": "boolean"
        }, {
          "name": "email_address",
          "title": {
            "en": "Optional: What is your email address?",
            "fi": "Vapaaehtoinen: Syötä sähköpostiosoitteesi."
          },
          "type": "text",
          "visibleIf": "{data_collection_consent}",
          "validators": [
            {
              "type": "email",
              "text": {
                "en": "The email address is not valid.",
                "fi": "Anna kelvollinen sähköpostiosoite."
              }
            }
          ]
        }
      ]
    } //,
  ],
  "requiredText": "",
  "showQuestionNumbers": "on",
  "storeOthersAsComment": false
};
