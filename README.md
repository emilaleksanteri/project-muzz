# What I would like to add to make the chat more complete

- Obvious first feature would be real time chat, this could be nicely done with Go with the help of something like [Gorilla Websockets](https://github.com/gorilla/websocket)

- Second feature would be to add native like gesture controls for replying and adding actions to message bubbles, these can be done in vanilla React with useRef and event tricks

- Send audio message, since the Muzz mobile app has this feature it could be added on the web version too, since the browser has a [meadia stream api](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API)

- Extending the image send feature to support video file types and html `<video>` tag could display the video within the chat interface

- Finally live calls could be possible to implement on the Web app too via a protocol like [WebRTC](https://webrtc.org/) so users could do live video calls from the browser
