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
          newData.child('age').val()       !== '' &&
          newData.child('playerMin').val() !== '' && newData.child('playerMax').val() !== ''
          ",
        "title": {
          ".validate": "
            ( // new game
             !data.exists()
             &&
             newData.isString() && newData.val() !== '' && newData.val().length < 50
            )
            ||
            ( // existing game
             data.val() === newData.val()
            )
            ",
        },
        "desc": {
          ".validate": "
            newData.isString() && newData.val() !== '' && newData.val().length < 5000
            ",
        },
        "imgUrl": {
          ".validate": "
            newData.isString() &&
            // accept only images from our storage
            newData.val().matches(/^https:\\/\\/firebasestorage.googleapis.com\\/v0\\/b\\/boardex-b8a9e.appspot.com/)
            ",
        }
      },
    },
  },
}
