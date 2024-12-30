const fileInput = document.querySelector("#file-input");
const clearBtn = document.querySelector("#clear-btn");
const downloadBtn = document.querySelector("button");

clearBtn.addEventListener("click", () => {
    fileInput.value = ""; 
    clearBtn.style.display = "none"; 
});

fileInput.addEventListener("input", () => {
    if (fileInput.value.trim()) {
        clearBtn.style.display = "block"; 
    } else {
        clearBtn.style.display = "none"; 
    }
});

downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const url = fileInput.value.trim();

    // Bonus URL validation ;)
    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
        alert("Please enter a valid URL.");
        return;
    }

    downloadBtn.innerText = "Downloading File...";
    fetchFile(url);
});

function fetchFile(url) {
    console.log("Fetching file from: ", url);
    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.blob();
        })
        .then((file) => {
            let tempUrl = URL.createObjectURL(file);
            let aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.download = url.split('/').pop();
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
            URL.revokeObjectURL(tempUrl);
            downloadBtn.innerText = "Download File";
        })
        .catch((err) => {
            console.error("ERROR:", err);
            alert("Failed to download file. Please check the URL.");
            downloadBtn.innerText = "Download File";
        });
}
