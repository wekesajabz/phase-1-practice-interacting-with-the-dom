document.addEventListener("DOMContentLoaded", () => {
    // Variables
    let counter = document.getElementById("counter");
    let plusButton = document.getElementById("plus");
    let minusButton = document.getElementById("minus");
    let heartButton = document.getElementById("heart");
    let pauseButton = document.getElementById("pause");
    let likesList = document.querySelector(".likes");
    let commentForm = document.getElementById("comment-form");
    let commentInput = document.getElementById("comment-input");
    
    let timer;
    let isPaused = false;
    let likes = {};

    // Function to start the counter
    function startCounter() {
        timer = setInterval(() => {
            counter.textContent = parseInt(counter.textContent) + 1;
        }, 1000);
    }

    // Function to pause the counter
    function pauseCounter() {
        clearInterval(timer);
    }

    // Initial start of the counter
    startCounter();

    // Event listeners
    plusButton.addEventListener("click", () => {
        counter.textContent = parseInt(counter.textContent) + 1;
    });

    minusButton.addEventListener("click", () => {
        counter.textContent = parseInt(counter.textContent) - 1;
    });

    heartButton.addEventListener("click", () => {
        let count = parseInt(counter.textContent);
        if (likes[count]) {
            likes[count]++;
        } else {
            likes[count] = 1;
        }
        displayLikes();
    });

    pauseButton.addEventListener("click", () => {
        if (isPaused) {
            startCounter();
            pauseButton.textContent = "pause";
            enableButtons();
        } else {
            pauseCounter();
            pauseButton.textContent = "resume";
            disableButtons();
        }
        isPaused = !isPaused;
    });

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addComment(commentInput.value);
        commentInput.value = "";
    });

    // Helper functions
    function displayLikes() {
        likesList.innerHTML = "";
        for (let key in likes) {
            let li = document.createElement("li");
            li.textContent = `${key} has been liked ${likes[key]} time${likes[key] > 1 ? 's' : ''}`;
            likesList.appendChild(li);
        }
    }

    function addComment(comment) {
        let p = document.createElement("p");
        p.textContent = comment;
        document.body.appendChild(p);
    }

    function disableButtons() {
        plusButton.disabled = true;
        minusButton.disabled = true;
        heartButton.disabled = true;
    }

    function enableButtons() {
        plusButton.disabled = false;
        minusButton.disabled = false;
        heartButton.disabled = false;
    }
});
