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
        }
      ]
    } //,
  ],
  "requiredText": "",
  "showQuestionNumbers": "on",
  "storeOthersAsComment": false
};
