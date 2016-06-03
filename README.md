# Vexillopedia | The flag encyclopedia
> _vexillum_ (flag) + _paedia_ (education)

:es: :fr: :cn: :kr: :de: :us: :uk: :it: :jp: :ru: ... [http://www.vexillopedia.org](http://www.vexillopedia.org)

The goal of this project is to build a simple, exhaustive and collaborative encyclopedia on all kinds of flags.


## Contributing

### Flags
- Open an Issue
- Fork and clone this repository
- To build the website locally, run `npm install` then `npm run dev` and go to `localhost:8080`
- Add (or update) a new entry to corresponding JSON file in the `data` folder with the following format:
```javascript
  ,{
    "name": "XXX XXX",
    "category": "",
    "history": "",
    "meaning": "",
    "ratio": "",
    "colors": [
        {
            "name": "",
            "hex": "#"
        },{
            "name": "",
            "hex": "#"
        },{
            "name": "",
            "hex": "#"
        }
    ],
    "design": "",
    "adoptionDate": 0000,
    "related": {
        "similar": [
            "XXX"
        ]
    },
    "sources": [
        "https://en.wikipedia.org/wiki/Flag_of_XXX"
    ]
  }
```

- Add (or update) the flag image `xxx-xxx.svg` to the `public/img/flag/` folder
- Make sure the tests don't break by running `npm run test`
- Commit your changes (with the message "Add XXX flag")
- Open a Pull Request

### Code
- Fork and clone this repository
- To build the website locally, run `npm install` then `npm run dev` and go to `localhost:8080`
- Make the changes you think are necessary
- Make sure your changes lint and pass the tests by running `npm t` (when there'll be some automated tests ...)
- Commit your changes
- Open a Pull Request
 
### Issues
- As long as it makes sense to a 5 years-old, it should be fine!


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key) + 🎌 for flags):

| [![Antonio Villagra De La Cruz](https://avatars.githubusercontent.com/AntonioVdlC?s=100)<br /><sub>Antonio Villagra De La Cruz</sub>](http://antoniovdlc.me)<br />[💻](https://github.com/AntonioVdlC/vexillopedia/commits?author=AntonioVdlC) [🎌](https://github.com/AntonioVdlC/vexillopedia/commits?author=AntonioVdlC) [📖](https://github.com/AntonioVdlC/vexillopedia/commits?author=AntonioVdlC) [🐛](https://github.com/AntonioVdlC/vexillopedia/issues?q=author%3AAntonioVdlC) |
| :---: |

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind welcome!


## Licence
MIT
