
service firebase.storage {
  match /b/boardex-b8a9e.appspot.com/o {
    match /games/{uid}/{game}/{allPaths=**} {
      allow read, write: 
          if request.auth.uid == uid
          && request.resource.contentType.matches('image/.*');
    }
  }
}
