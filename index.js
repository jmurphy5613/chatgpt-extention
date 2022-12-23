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
    const input = document.getElementsByClassName("api-key-input");

    if(input) {
        const { value } = input

        const encodedKey = encode(value)

        chrome.storage.local.set({ 'openai-key': encodedKey }, () => {
            document.getElementsByClassName('enter-key-container').style.display = 'none'
            document.getElementsByClassName("authed-key-container").style.display = 'block'
        })
    }
}

const changeKey = () => {

}


document
    .getElementsByClassName("continue-button")
    .addEventListener("click", saveKey);

checkForKey().then((response) => {
    if (response) {
        document.getElementsByClassName("enter-key-container").style.display ="none";
        document.getElementsByClassName("home-title").style.display = "block";
    }
});