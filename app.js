'use strict'

//O cálculo do IMC é feito dividindo o peso pela altura ao quadrado
let calcular = function (peso, altura) {
    return (peso / (Math.pow(altura, 2)))
}

//Função de click
$('#calcular').click(function () {

    let altura = parseFloat($('#valorIn').val())
    let peso = parseFloat($('#valorOut').val())

    let resultado = calcular(peso, altura).toFixed(2)
    let indicador = ""

    if (resultado < 18.5) {
        indicador = " - Abaixo do peso"
    } else if (resultado >= 18.5 && resultado < 25) {
        indicador = " - Peso normal"
    } else if (resultado >= 25 && resultado < 30) {
        indicador = " - Sobrepeso"
    } else if (resultado >= 30 && resultado < 35) {
        indicador = " - Obesidade grau 1"
    } else if (resultado >= 35 && resultado < 40) {
        indicador = " - Obesidade grau 2"
    } else if (resultado >= 40) {
        indicador = " - Obesidade grau 3"
    }

    resultado += indicador

    let erro = validarDados()
    if (erro)
        apresentarMessagemErro()
    else {
        //armazena os dados no banco local
        $('#valorResultado').val(resultado)
        persistirNoWebStorage(altura, peso, resultado)
    }

})

//Função de ir para o histórico
$('#bntLnkHist').click(function () {
    location.href = " historico.html"
})


let persistirNoWebStorage = function (altura, peso, resultado) {

    var dNow = new Date();
    var localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes()
        + ':' + dNow.getSeconds();

    let dados = {
        'peso': peso,
        'altura': altura,
        'resultado': resultado,
        'data': localdate

    };

    localStorage.setItem(localdate, JSON.stringify(dados))

}

let preencheTabelaHistorico = function () {

    let objetoRecuperado;

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {

        objetoRecuperado = JSON.parse(localStorage.getItem(keys[i]));

        $("#tabelaHistorico tbody").append(
            "<tr>" +
            "<td>" + keys[i] + "</td>" +
            "<td>" + objetoRecuperado.peso + "</td>" +
            "<td>" + objetoRecuperado.altura + "</td>" +
            "<td>" + objetoRecuperado.resultado + "</td>" +
            "</tr>"
        );
    }

}

let formatarDataTable = function () {
    $(document).ready(function () {
        var table = $('#tabelaHistorico').DataTable({
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            responsive: true,
            language: {
                "decimal": "",
                "emptyTable": "Não há dados registrados",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoEmpty": "Mostrando 0 to 0 of 0 registros",
                "infoFiltered": "(filtrados de _MAX_ total registros)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ registros",
                "loadingRecords": "Buscando registros...",
                "processing": "Processando...",
                "search": "Pesquisar:",
                "zeroRecords": "Nenhum regitro encontrado",
                "paginate": {
                    "first": "primeiro",
                    "last": "último",
                    "next": "próximo",
                    "previous": "anterior"
                },
                "aria": {
                    "sortAscending": ": ativar ordernação ascendente",
                    "sortDescending": ": aticar ordenação descendende"
                }
            }

        });
    });
}

let validarDados = function () {
    let altura = parseFloat($('#valorIn').val())
    let peso = parseFloat($('#valorOut').val())

    return isNaN(altura) || isNaN(peso)
}

let apresentarMessagemErro = function () {
    let altura = parseFloat($('#valorIn').val())
    let peso = parseFloat($('#valorOut').val())

    var mensagem
    if (isNaN(altura) && isNaN(peso))
        mensagem = "Informe uma altura e um peso, por favor"
    else if (isNaN(altura))
        mensagem = "Informe uma altura, por favor"
    else if (isNaN(peso))
        mensagem = "Informe um peso, por favor"

    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: mensagem
    })
}
