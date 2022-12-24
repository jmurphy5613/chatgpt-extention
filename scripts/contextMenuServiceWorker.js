const getKey = () => {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(["openai-key"], (result) => {
          if (result["openai-key"]) {
              const decodedKey = atob(result["openai-key"]);
              resolve(decodedKey);
          }
      });
  });  
}

const sendMessage = (content) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0].id

        chrome.tabs.sendMessage(
            activeTab,
            {message: 'getContent', content},
        )
    })
}

const generate = async (prompt) => {
    const key = 'lol'
    const url = "https://api.openai.com/v1/completions"

    const completionResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7
        })
    })


    const completion = await completionResponse.json()
    return completion.choices.pop()

}

const generateCompleteAction = async (info) => {
    try {

        chrome.storage.local.set({ data: "hi" }, () => {
            chrome.windows.create({
                url: "index.html",
                type: "popup",
                height: 500,
                width: 600,
            });
        });        
        const { selectionText } = info
        const prompt = `write me an explination of ${selectionText} like i'm 5 years old`
        const res = await generate(prompt)



        
    } catch (error) {
        console.log(error)
    }
}


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'context-run',
        title: "explain like i'm 5",
        contexts: ['selection']
    })
})

chrome.contextMenus.onClicked.addListener(generateCompleteAction)