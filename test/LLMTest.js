const axios = require('axios');
API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b";
headers = {"Authorization": "Bearer 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"};
response = axios.post(API_URL, "ÄãºÃ", { headers })
.then(response=>{
    console.info(response.data);
})
