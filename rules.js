{
  "rules": {
    "games": {
      ".read": true,
      ".indexOn": "title",
      "$game": {
        ".write": "
          auth != null && 
          (
           !data.exists() ||
           data.child('uid').val() === auth.id
          )
          ",
      },
    },
  },
}
