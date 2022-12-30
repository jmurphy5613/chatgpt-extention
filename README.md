# explain it like i'm 5
This is a chatgpt based browser extention that uses the model text-davinci-003 to explain concepts as if you were still in kindergarten.


## Service workers
Service workers are used to allow users to highlight text to feed into the prompt. 


![demo](https://i.imgur.com/TXAGF8l.png)


## Popup
Once the service worker sends the information to the app, the OpenAI API is used to fetch the data and it is served on a chrome popup.

![popup](https://i.imgur.com/sLKYp4e.png)
