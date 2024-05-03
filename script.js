script.js
document.getElementById("textToSpeechForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var text = document.getElementById("text").value;

    fetch("https://eastus.tts.speech.microsoft.com/cognitiveservices/v1", {
        method: "POST",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiIxNmNkZmJjNWE2ZWI0Nzc5YjBhMGJkNjM4YjAzNjc0NCIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8yMjJiZjNmMy1hMzY1LTQ0MzAtYTQyYy1jOTFkN2Q3OWJiNDgvcmVzb3VyY2VHcm91cHMvbGFiMTEvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy9tYXJhMjAwMjMwMDMiLCJzY29wZSI6InNwZWVjaHNlcnZpY2VzIiwiYXVkIjoidXJuOm1zLnNwZWVjaHNlcnZpY2VzLmVhc3R1cyIsImV4cCI6MTcxNDc0NjE3NywiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.Ye7FlrDzKMoubXEK4Bw000wlhPf-zjHZvk4THEmuRU704ufkjW0fvygEDMixOZqxUVcsy-H6ir6gRlpEAxOalA",
            "Ocp-Apim-Subscription-Key": "9e79d3c0359a4e7aa28c4bd72e623b67",
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm"
        },
        body: "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='en-US-AriaNeural'>" + text + "</voice></speak>"
    })
    .then(function(response) {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error("Error in request");
        }
    })
    .then(function(blob) {
        var audioElement = document.createElement("audio");
        audioElement.src = URL.createObjectURL(blob);
        audioElement.controls = true;

        document.getElementById("audioPlayer").appendChild(audioElement);
    })
    .catch(function(error) {
        console.log("Error: " + error.message);
    });
});
