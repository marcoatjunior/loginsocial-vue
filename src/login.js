function login (name, email)
{
    let data = new Date(),
        dia = data.getDate().toString(),
        diaF = dia.length == 1 ? "0" + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = mes.length == 1 ? "0" + mes : mes,
        anoF = data.getFullYear();

    return {
        name: name,
        email: email,
        documents: {
            cpf: null
        },
        data_cadastro: diaF + "/" + mesF + "/" + anoF,
        role: 2,
        edit: false
    };
}