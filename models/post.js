var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    title: String,
    img: {type:String, default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKASURBVEhL7dZLqE1RHMfxgxAGhIuBAeWVAVIiJp4DbwMlJBMx8OxKMTLAxGNAZiSkpAyIpAw8Ut5hYOCVZwYiSsjb98v9Z+1t3+Oea5OBX33qnLX3WWudtddjV/61TESv7x//brrhGtaihwV/IkOwDd2/ffuRrtiLT7iHfVgAO1Va5uMZdjd87o9IX2zAA3zBexzCBJSSftgDK7YBG9qBMWiBlrCxE/C6jqMnSolDuQzXEQ3cwkq0h5mC+1iDzhaUnfE4hujAE8yGcQQG4iCuwM6UHit1DkQHTsIh/5CUvUIflBYn1jwMxTtEQ0UuoRNKyUK8hZvKDRQ1mLqNUWhW5uAiHuM5ihqoxpEZgJpTB3cuK/E5usG4ns0K5Bsqsho1xUZnYTPSiuzAJrjW03IdgcM7Ao8ayrajyXH5+DzzFTt0u7A/KUu9xjqMhmvbsjvwTzQ5G5FWeheDYJzZ6bVfOY/YdBo9bIbDLfIo0h+fhZMsLct7gYf4nJQF62uDrYh5kknRswsO9WJcTcqCu1kHGLdbD5D8PWfwEeOQSSucRv4HYQkm40JSlnLWm45wNcSKyPvpRPMsLhomeVqdypXlOeOHoS2MHXmD/E7nd8//TC4jvalWbjSmHQZjEuxQHLNhPTJZhPSGapxwVuDRGGX+mwOIl4hp8PHcRPrbemTSGu6z6U1FnGDOUuOB4JKJay9hg1NhpsN17Qbj9XOI5ZXJWDj7oqIi/os0bhL5Do/EDBh3s8Pw5SLmQGGq7cVP4QrIx3PYa3Gfw74cNce3DLfBtFG51huL+3vc56Sai2bFf7ETvllEhUtRFEdhC1bBGd0Fvx2fi2t0Jnpb8D+1p1L5CnO3SQM33J9HAAAAAElFTkSuQmCC"},
    body: String,
    created: {type:Date, default: Date.now()},
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        required: false
    }]
});

module.exports = mongoose.model("Blog", blogSchema);
