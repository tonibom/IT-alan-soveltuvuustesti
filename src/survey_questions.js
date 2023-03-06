export const questions = [
  {
    name: "work_during_studies",
    title: {
      fi: "Haluan opiskella alaa, jossa työllistyn alalle heti valmistumisen jälkeen.",
      en: "I want to study a field for which I will get a job immediately after graduation."
    },
    type: "radiogroup",
    choices: [
      {
        value: "does_not_matter",
        text: {
          fi: "Ei niin väliä",
          en: "Does not matter"
        }
      }, {
        value: "would_be_nice",
        text: {
          fi: "Mukavaahan se olisi",
          en: "Would be nice"
        }
      }, {
        value: "absolutely",
        text: {
          fi: "Ehdottomasti!",
          en: "Absolutely!"
        }
      }, {
        value: "prefer_to_work_during_studies",
        text: {
          fi: "Haluaisin työskennellä alalla jo opiskellessani",
          en: "I would like to work in the field already during my studies."
        }
      }
    ]
  }, {
    name: "importance_of_salary",
    title: {
      default: "Kuinka tärkeä palkka on sinulle?",
      fi: "Kuinka tärkeä palkka on sinulle?"
    },
    type: "radiogroup",
    choices: [
      {
        value: "meaningful_work_more_important",
        text: {
          default: "Palkkaa tärkeämpää on työn mielekkyys",
          fi: "Palkkaa tärkeämpää on työn mielekkyys"
        }
      }, {
        value: "stable_income",
        text: {
          default: "Tasaiset tulot, jolla voi elää ja niistä jää myös säästöön",
          fi: "Tasaiset tulot, jolla voi elää ja niistä jää myös säästöön"
        }
      }, {
        value: "would_like_to_be_millionaire",
        text: {
          default: "Miljonäärinä olisi mukava elellä",
          fi: "Miljonäärinä olisi mukava elellä"
        }
      }
    ]
  }, {
    name: "most_interesting_about_touch_screens",
    title: {
      default: "Mikä sinun mielestäsi on kiehtovinta kosketusnäytöissä?",
      fi: "Mikä sinun mielestäsi on kiehtovinta kosketusnäytöissä?"
    },
    type: "radiogroup",
    choices: [
      {
        value: "finger_recognition_with_physics",
        text: {
          default: "Millainen fyysinen ilmiö tunnistaa sormeni?",
          fi: "Millainen fyysinen ilmiö tunnistaa sormeni?"
        }
      }, {
        value: "screen_position_recognition",
        text: {
          default: "Miten kosketusnäyttö tietää, että painoin juuri oikeaa kohtaa?",
          fi: "Miten kosketusnäyttö tietää, että painoin juuri oikeaa kohtaa?"
        }
      }, {
        value: "intuitive_usage",
        text: {
          default: "Miksi näytön toiminta on suunniteltu niin intuitiiviseksi?",
          fi: "Miksi näytön toiminta on suunniteltu niin intuitiiviseksi?"
        }
      }
    ]
  }, {
    name: "piece_of_technology_to_work_with",
    title: {
      default: "Teknologia, jonka parissa haluaisin eniten työskennellä?",
      fi: "Teknologia, jonka parissa haluaisin eniten työskennellä?"
    },
    type: "radiogroup",
    choices: [
      {
        value: "software",
        text: {
          default: "Ohjelmistot kuten mobiiliapplikaatiot ja nettisivut tai tietojärjestelmät kuten Wilma",
          fi: "Ohjelmistot kuten mobiiliapplikaatiot ja nettisivut tai tietojärjestelmät kuten Wilma"
        }
      }, {
        value: "ai_cybersecurity_robotics",
        text: {
          default: "Tekoäly, kyberturvallisuus, robotiikka",
          fi: "Tekoäly, kyberturvallisuus, robotiikka"
        }
      }, {
        value: "electronics",
        text: {
          default: "Elektroniikka, kuten painettava äly, langattomat ohjaus- ja mittausjärjestelmät tai tietoliikenneverkot",
          fi: "Elektroniikka, kuten painettava äly, langattomat ohjaus- ja mittausjärjestelmät tai tietoliikenneverkot"
        }
      }
    ]
  }, {
    name: "interest_in_used_software",
    title: {
      default: "Mikä sinua kiinnostaa eniten ohjelmistoissa, joita itse käytät?",
      fi: "Mikä sinua kiinnostaa eniten ohjelmistoissa, joita itse käytät?"
    },
    type: "radiogroup",
    choices: [
      {
        value: "how_does_it_work",
        text: {
          default: "Miten ihmeessä ne voivat ylipäätään toimia, mistä muisti ja prosessori rakennetaan ohjelmistojen suorittamista varten?",
          fi: "Miten ihmeessä ne voivat ylipäätään toimia, mistä muisti ja prosessori rakennetaan ohjelmistojen suorittamista varten?"
        }
      }, {
        value: "algorithms_and_graphics",
        text: {
          default: "Millaisia algoritmeja ohjelman taustalla mahtaakaan pyöriä? Mitä tarvitsee tietää, että voidaan esimerkiksi laskea mikä pikseli kuuluu mihinkin paikkaan näytöllä?",
          fi: "Millaisia algoritmeja ohjelman taustalla mahtaakaan pyöriä? Mitä tarvitsee tietää, että voidaan esimerkiksi laskea mikä pikseli kuuluu mihinkin paikkaan näytöllä?"
        }
      }, {
        value: "ui_and_ux",
        text: {
          default: "Mikä tekee ohjelman käytöstä miellyttävää? Miksi käyttöliittymä on laadittu sellaiseksi kuin se on?",
          fi: "Mikä tekee ohjelman käytöstä miellyttävää? Miksi käyttöliittymä on laadittu sellaiseksi kuin se on?"
        }
      }
    ]
  }, {
    name: "aspirations_for_future",
    title: {
      default: "Valitse näistä sopivin vaihtoehto",
      fi: "Valitse näistä sopivin vaihtoehto"
    },
    type: "radiogroup",
    choices: [
      {
        value: "develop_electronics_and_networks",
        text: {
          default: "Haluan vaikuttaa ihmisten elämään kaikkialla maailmassa suunnittelemalla kestäviä elektroniikkalaitteita ja tietoliikenneratkaisuja",
          fi: "Haluan vaikuttaa ihmisten elämään kaikkialla maailmassa suunnittelemalla kestäviä elektroniikkalaitteita ja tietoliikenneratkaisuja"
        }
      }, {
        value: "improve_cybersecurity_and_new_technologies",
        text: {
          default: "Haluan osaamisellani esimerkiksi kehittää kyberturvallisuutta tai uusia teknologioita edistämään ihmisten hyvinvointia ja kestävää kehitystä.",
          fi: "Haluan osaamisellani esimerkiksi kehittää kyberturvallisuutta tai uusia teknologioita edistämään ihmisten hyvinvointia ja kestävää kehitystä."
        }
      }, {
        value: "ensure_usability_of_technology",
        text: {
          default: "Haluan vaikuttaa osaamisellani siihen, millaiseksi maailma muuttuu digitalisaation edetessä ja varmistaa, että kehittämämme teknologia on käytettävää ja kehityksen keskiössä ovat ihmiset eli käyttäjät.",
          fi: "Haluan vaikuttaa osaamisellani siihen, millaiseksi maailma muuttuu digitalisaation edetessä ja varmistaa, että kehittämämme teknologia on käytettävää ja kehityksen keskiössä ovat ihmiset eli käyttäjät."
        }
      }
    ]
  }, {
    name: "relationship_with_math",
    title: {
      default: "Suhteeni matematiikkaan",
      fi: "Suhteeni matematiikkaan"
    },
    type: "radiogroup",
    choices: [
      {
        value: "best_friends",
        text: {
          default: "Olemme parhaita ystävyksiä ja näkisin, että voisimme olla myös hyviä työkavereita.",
          fi: "Olemme parhaita ystävyksiä ja näkisin, että voisimme olla myös hyviä työkavereita."
        }
      }, {
        value: "friends",
        text: {
          default: "Olemme kavereita ja voimme jakaa saman avokonttorin.",
          fi: "Olemme kavereita ja voimme jakaa saman avokonttorin."
        }
      }, {
        value: "everyday_acquaintance",
        text: {
          default: "Olemme hyvän päivän tuttuja ja moikkaamme kun näemme.",
          fi: "Olemme hyvän päivän tuttuja ja moikkaamme kun näemme."
        }
      }, {
        value: "stay_out_of_each_others_way",
        text: {
          default: "Tunnemme kyllä, mutta sovimme että pysymme poissa toistemme tieltä.",
          fi: "Tunnemme kyllä, mutta sovimme että pysymme poissa toistemme tieltä."
        }
      }
    ]
  }, {
    name: "iternationality",
    title: {
      default: "Kansainvälisyys",
      fi: "Kansainvälisyys"
    },
    type: "radiogroup",
    choices: [
      {
        value: "live_and_work_abroad",
        text: {
          default: "Haluaisin tulevaisuudessa asua ja työskennellä ulkomailla.",
          fi: "Haluaisin tulevaisuudessa asua ja työskennellä ulkomailla."
        }
      }, {
        value: "international_environment_living_in_finland",
        text: {
          default: "Kansainvälinen työympäristö olisi mukavaa, mutta asuisin mielelläni Suomessa.",
          fi: "Kansainvälinen työympäristö olisi mukavaa, mutta asuisin mielelläni Suomessa."
        }
      }, {
        value: "english_not_my_strong_suite",
        text: {
          default: "Koen, että esimerkiksi englannin kieli ei ole minun vahvin puoleni, mutta tulen toimeen ja tehdessä oppii.",
          fi: "Koen, että esimerkiksi englannin kieli ei ole minun vahvin puoleni, mutta tulen toimeen ja tehdessä oppii."
        }
      }
    ]
  } // Next question
];
