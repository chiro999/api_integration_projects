document.getElementById("toggle").addEventListener("click", function(){
    document.getElementsByTagName('body')[0].classList.toggle("dark-theme");
});

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <ul>
                <li>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[0].definition}
                    </p>
                </li>
                <li>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[1].definition}
                    </p>
                </li>
            </ul>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;        
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    sound.play();
}

