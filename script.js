const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    downloadBtn.innerText="Downloading File...";
    fetchFile(fileInput.value);
});

function fetchFile(url){
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
    }).catch((err)=>{
        console.log("ERROR: ", err);
        alert("Failed to download file. Please check the URL");
        downloadBtn.innerText= "Download File";
    });
}