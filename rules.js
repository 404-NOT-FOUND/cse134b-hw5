{
  "rules": {
    "games": {
      ".read": true,
      ".indexOn": "title",
      "$game": {
        ".write": "
          auth != null && 
          (
           ( // new game
             !data.exists()
           ) 
           ||
           ( // existing game
             data.child('uid').val() === auth.uid
             &&
             data.child('title').val() === newData.child('title').val()
           )
          )
          ",
        ".validate": "
          newData.hasChildren(['title', 'desc', 'imgUrl', 'age', 'playerMin', 'playerMax',])
          ",
      },
    },
  },
}
