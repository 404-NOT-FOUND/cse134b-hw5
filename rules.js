{
  "rules": {
    "games": {
      ".read": true,
      ".indexOn": "title",
      "$game": {
        ".write": "
          auth != null &&
          ( // new game
            !data.exists()
            || // existing game
            data.child('uid').val() === auth.uid
          )
          ",
        ".validate": "
          newData.hasChildren(['title', 'desc', 'imgUrl', 'age', 'playerMin', 'playerMax',])
          &&
          newData.child('title').val()     !== '' && newData.child('desc').val()      !== '' &&
          newData.child('imgUrl').val()    !== '' && newData.child('age').val()       !== '' &&
          newData.child('playerMin').val() !== '' && newData.child('playerMax').val() !== ''
          ",
        "title": {
          ".validate": "
            // new game
            !data.exists() 
            || // existing game
            data.val() === newData.val()
          "
        },
      },
    },
  },
}
