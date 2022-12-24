const encode = (string) => {
    return btoa(string)
}

const checkForKey = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["openai-key"], (result) => {
            resolve(result["openai-key"]);
        });
    });
};

const checkForContent = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["data"], (result) => {
            resolve(result["data"])
        })
    })
}

const saveKey = () => {
    const input = document.getElementById("api-key-input");

    if(input) {
        const { value } = input
        console.log(value)

        const encodedKey = encode(value)

        chrome.storage.local.set({ 'openai-key': encodedKey }, () => {
            document.getElementById('enter-key-container').style.display = 'none'
            document.getElementById("authed-key-container").style.display = 'flex'
        })
    }
}

const clearKey = () => {
    chrome.storage.local.set({ 'openai-key': null }, () => {
        document.getElementById("enter-key-container").style.display = "flex";
        document.getElementById("authed-key-container").style.display = "none";        
    })
}

document
    .getElementById("continue-button")
    .addEventListener("click", saveKey);

document.getElementById('change-key').addEventListener("click", clearKey)

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "getContent":
            console.log('heyyyy')
            break;
        default:
            console.error("Unrecognised message: ", message);
    }
});

const setContent = async () => {
    const content = await checkForContent()
    document.getElementById("response").innerHTML = content

    var typed = new Typed('.animate', {
        strings: ["hello world"]
    })
}

checkForKey().then((response) => {
    if (response) {
        document.getElementById("enter-key-container").style.display ="none";
        document.getElementById("authed-key-container").style.display = "flex";

        setContent()
        
    }
});

