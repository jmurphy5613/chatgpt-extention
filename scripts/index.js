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

const saveKey = () => {
    console.log("hey")
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


checkForKey().then((response) => {
    if (response) {
        document.getElementById("enter-key-container").style.display ="none";
        document.getElementById("authed-key-container").style.display = "flex";
    }
});