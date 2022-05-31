function exibeEmail(email) {
    var poss = email.indexOf("@")
    var primeiro = email.slice(0, poss)
    var segundo = email.slice(poss)

    for(var i = 0; i < (primeiro.length) / 2; i++) {
        console.log(i)
        primeiro = primeiro.replace(primeiro[i], "*")
    }
    return primeiro + segundo
}
