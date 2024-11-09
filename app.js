// Event listener for the "Upload Image" button
document.getElementById("uploadButton").addEventListener("click", function () {
    document.getElementById("imageUpload").click();
});

// Event listener for when a file is selected in the file input
document.getElementById("imageUpload").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none";

    const apiKey = "f6CNzmqQDzp5GLwtUK9gwuGz"; // Your API key for Remove.bg
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": apiKey },
            body: formData
        });

        const blob = await response.blob();
        const outputImage = document.getElementById("outputImage");
        outputImage.src = URL.createObjectURL(blob);

        document.getElementById("loading").style.display = "none";
        document.getElementById("result").style.display = "block";

        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = outputImage.src;
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to remove background.");
        document.getElementById("loading").style.display = "none";
    }
});

// Event listener for the "Remove More" button
document.getElementById("removeMoreButton").addEventListener("click", function () {
    // Reset the file input and hide the result section
    document.getElementById("imageUpload").value = "";
    document.getElementById("result").style.display = "none";
});
