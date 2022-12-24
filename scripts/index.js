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

const checkForPrompt = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["prompt"], (result) => {
            resolve(result["prompt"])
        })
    })
}

const saveKey = () => {
    const input = document.getElementById("api-key-input");

    if(input) {
        const { value } = input
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

document.getElementById("continue-button").addEventListener("click", saveKey);

document.getElementById('change-key').addEventListener("click", clearKey)

const setContent = async () => {
    const content = await checkForContent()
    const prompt = await checkForPrompt()
    document.getElementById("response").innerHTML = content
    document.getElementById("prompt").innerHTML = `"${prompt}"`
}

checkForKey().then((response) => {
    if (response) {
        document.getElementById("enter-key-container").style.display ="none";
        document.getElementById("authed-key-container").style.display = "flex";
        setContent()
    }
});

