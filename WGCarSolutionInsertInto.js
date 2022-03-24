import Leite from 'leite'
import fs from 'fs'
const leite = new Leite()



let iEndereco = 1;
let enderecosQuery = [];
function criaEndereco() {
  const hasComplement = Math.floor(Math.random() * 2);
  let rua, bairro, cidade;

  do {
    rua = leite.localizacao.logradouro()
  } while (rua.includes("'") || rua.length > 50)

  do {
    bairro = leite.localizacao.bairro()
  } while (bairro.includes("'") || bairro.length > 100)

  do {
    cidade = leite.localizacao.cidade()
  } while (cidade.includes("'") || cidade.length > 50)

  const endereco = {
    id_endereco: iEndereco,
    rua,
    numero: leite.localizacao.numero(),
    bairro,
    cidade,
    uf: leite.localizacao.estado(),
    complemento: hasComplement ? leite.localizacao.complemento() : null,
  }
  iEndereco++;
  return endereco
}
while (iEndereco <= 10) {

  const endereco = criaEndereco()
  const codigoInsert = `INSERT INTO ENDERECOS ( RUA, BAIRRO, NUMERO, CIDADE, UF, COMPLEMENTO) VALUES ('${endereco.rua}','${endereco.bairro}','${endereco.numero}','${endereco.cidade}','${endereco.uf}','${endereco.complemento}')`

  enderecosQuery.push(codigoInsert)
}






let iSetor = 1;
const nomeSetores = ["borracharia", "eletrica", "vidro", "pintura", "mecânica"];
const setores = [];
const setoresQuery = []
const countSetor = nomeSetores.length

function criaSetores() {
  const rndSetor = Math.floor(Math.random() * nomeSetores.length);
  const setor = {
    id_setor: iSetor,
    nome: nomeSetores[rndSetor],
  }
  nomeSetores.splice(rndSetor, 1)
  iSetor++
  return setor
}
while (iSetor <= countSetor) {
  const setor = criaSetores()
  setoresQuery.push(`INSERT INTO SETORES (NOME_SETOR) VALUES ('${setor.nome}')`)
  setores.push(setor)
}









const clientes = [];
const clientesQuery = []
function criaCliente() {
  let nome;
  do {
    nome = leite.pessoa.nome()
  } while (nome.includes("'"))

  const cliente = {
    nome,
    cpf: leite.pessoa.cpf(),
    rg: leite.pessoa.rg().replace(/(\.)|(\-)/g, ''),
    data_nascimento: leite.pessoa.nascimento({ string: true }),
    id_endereco: Math.floor(Math.random() * enderecosQuery.length) + 1
  }
  return cliente
}
while (clientes.length < 10) {
  const cliente = criaCliente()
  clientesQuery.push(`INSERT INTO CLIENTES (NOME,CPF,RG,DATA_NASCIMENTO,ID_ENDERECO) VALUES ('${cliente.nome}','${cliente.cpf}','${cliente.rg}','${cliente.data_nascimento}','${cliente.id_endereco}')`)
  clientes.push(cliente)
}








let iFuncionario = 1;
const funcionarios = [];
const funcionariosQuery = [];
function criaFuncionario() {
  let nome;
  do {
    nome = leite.pessoa.nome()
  } while (nome.includes("'"))

  const funcionario = {
    codigo_registro: iFuncionario,
    nome,
    cpf: leite.pessoa.cpf(),
    rg: leite.pessoa.rg().replace(/(\.)|(\-)/g, ''),
    data_nascimento: leite.pessoa.nascimento({ string: true }),
    id_endereco: Math.floor(Math.random() * enderecosQuery.length) + 1

  }
  iFuncionario++;
  return funcionario
}
while (funcionarios.length < 10) {
  const funcionario = criaFuncionario()
  funcionarios.push(funcionario)
  funcionariosQuery.push(`INSERT INTO FUNCIONARIOS (NOME,CPF,RG,DATA_NASCIMENTO,ID_ENDERECO) VALUES ('${funcionario.nome}','${funcionario.cpf}','${funcionario.rg}','${funcionario.data_nascimento}','${funcionario.id_endereco}')`)

}







let iTelefone = 1;
const telefonesQuery = [];
function criaTelefone() {

  let numero = leite.pessoa.cpf().split("")
  numero[2] = 9
  if (numero[0] == 0) {
    numero[0] = 1;
  }
  numero = numero.join('')


  const telefone = {
    id_telefone: iTelefone,
    id_pessoa: /* Math.floor(Math.random() * 2) */ true ? clientes[Math.floor(Math.random() * clientes.length)].cpf : funcionarios[Math.floor(Math.random() * funcionarios.length)].cpf,
    telefone: numero,
  }
  iTelefone++;
  return telefone;
}
while (telefonesQuery.length < 10) {
  const telefone = criaTelefone()
  telefonesQuery.push(`INSERT INTO TELEFONES (ID_CLIENTE, TELEFONE) VALUES ('${telefone.id_pessoa}', '${telefone.telefone}')`)
}





Date.prototype.subDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
}

Date.prototype.addHours = function (hours) {
  const date = new Date(this.valueOf());
  date.setHours(date.getHours() + hours);
  return date;
}

Date.prototype.addMinutes = function (minutes) {
  const date = new Date(this.valueOf());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

Date.prototype.addSeconds = function (seconds) {
  const date = new Date(this.valueOf());
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}






let veiculos = []
const veiculosQuery = [];
function criaVeiculo() {
  let chassi = ""
  while (chassi.length <= 17) {
    chassi += Math.floor(Math.random() * 17)
  }

  const date = new Date();
  const dataBaixa = date.subDays(Math.floor(Math.random() * 365 * 5))

  const diffTime = Math.abs(dataBaixa - new Date());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dataFabricacao = dataBaixa.addDays(Math.floor(Math.random() * diffDays))

  let renavam
  do {
    renavam = leite.veiculo.renavam()

  } while (veiculos.some(vei => vei.renavam == renavam))


  const veiculo = {
    renavam,
    chassi: chassi,
    marca: leite.veiculo.marca(),
    modelo: leite.veiculo.modelo(),
    data_modelo: dataBaixa.toLocaleString().substr(0, 10),
    data_fabricacao: dataFabricacao.toLocaleString().substr(0, 10),
    id_cliente: clientes[Math.floor(Math.random() * clientes.length)].cpf
  }
  return veiculo
}

while (veiculos.length < 10) {
  const veiculo = criaVeiculo()
  veiculos.push(veiculo)
  veiculosQuery.push(`INSERT INTO VEICULOS (RENAVAM,CHASSI,MARCA,MODELO,ANO_MODELO, ANO_FABRICACAO, ID_CLIENTE) VALUES ('${veiculo.renavam}','${veiculo.chassi}','${veiculo.marca}','${veiculo.modelo}','${veiculo.data_modelo}','${veiculo.data_fabricacao}','${veiculo.id_cliente}')`)
}








let funcionarioSetores = []
let funcionarioSetoresQuery = []
let iFuncionarioSetores = 1;
function criaFuncionarioDosSetores() {
  const funcionarioSetor = {
    id_funcionario: iFuncionarioSetores,
    id_setor: Math.floor(Math.random() * setores.length) + 1
  }
  iFuncionarioSetores++
  return funcionarioSetor;
}
while (iFuncionarioSetores <= funcionarios.length) {
  const funcionarioSetor = criaFuncionarioDosSetores()
  funcionarioSetores.push(funcionarioSetor)
  funcionarioSetoresQuery.push(`INSERT INTO FUNCIONARIOS_SETORES (ID_FUNCIONARIO,ID_SETOR) VALUES (${funcionarioSetor.id_funcionario}, ${funcionarioSetor.id_setor})`)
}









let iServicos = 1;
const servicos = [];
const servicosQuery = [];
function criaServicos() {

  const dicTempoExecucao = {
    borracharia: () => `${Math.floor(Math.random() * (4 - 2)) + 2}:00:00`,
    eletrica: () => `${Math.floor(Math.random() * (7 - 4)) + 2}:00:00`,
    vidro: () => `${Math.floor(Math.random() * (15 - 6)) + 2}:00:00`,
    pintura: () => `${Math.floor(Math.random() * (24 - 14)) + 2}:00:00`,
    mecânica: () => {
      return `${Math.floor(Math.random() * (7 - 2)) + 2}:00:00`
    }
  }

  const rndSetor = Math.floor(Math.random() * setores.length) + 1

  const nomeSetor = setores.find(setor => setor.id_setor == rndSetor).nome
  const carroId = Math.floor(Math.random() * veiculos.length)

  const dataConvertidaCarro = new Date(veiculos[carroId].data_fabricacao.split('/').reverse().join('/'))

  const timeDiff = Math.abs(new Date().getTime() - dataConvertidaCarro.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const data_registro = dataConvertidaCarro.addDays(Math.floor(Math.random() * diffDays)).addHours(Math.floor(Math.random() * 24)).addMinutes(Math.floor(Math.random() * 60)).addSeconds(Math.floor(Math.random() * 60))

  const servico = {
    id_servico: iServicos,
    tempo_execucao: dicTempoExecucao[nomeSetor](),
    data_registro: data_registro,
    id_setor: rndSetor,
    id_veiculo: veiculos[carroId].renavam

  }

  iServicos++;
  return servico
}

while (servicos.length <= 45) {
  const servico = criaServicos()
  const dataregistro = servico.data_registro.toLocaleString()


  servicosQuery.push(`INSERT INTO SERVICOS (TEMPO_EXECUCAO, DATA_REGISTRO,ID_SETOR,ID_VEICULO) VALUES ('${servico.tempo_execucao}','${dataregistro}',${servico.id_setor}, '${servico.id_veiculo}')`)
  servicos.push(servico)
}








let iAgendamento = 1;
const agendamentos = []
const agendamentosQuery = []
function criaAgendamento() {

  let saida = false;
  let mAgendamento = {}
  while (!saida) {

    const servicoId = Math.floor(Math.random() * servicos.length) + 1

    let servicoRepetido = false


    if (agendamentos.some(age => age.id_servico == servicoId)) {
      servicoRepetido = true
    }
    if (!servicoRepetido) {

      const servico_data_registro = servicos[servicoId - 1].data_registro

      const dataAgendamento = servico_data_registro.addDays(Math.floor(Math.random() * 365))

      mAgendamento = {
        id_agendamento: iAgendamento,
        data_agendamento: dataAgendamento.toLocaleString().substr(0, 10),
        id_servico: servicoId,
      }

      iAgendamento++;
      saida = true

    }
  }
  return mAgendamento
}

while (agendamentos.length < Math.floor(Math.random() * servicos.length)) {
  const agendamento = criaAgendamento()
  agendamentosQuery.push(`INSERT INTO AGENDAMENTOS (DATA_AGENDAMENTO,ID_SERVICO) VALUES ('${agendamento.data_agendamento}', ${agendamento.id_servico})`)
  agendamentos.push(agendamento)
}










const dicTipoServico = {
  borracharia: () => {
    const listBorrachariaServicos = ["troca de pneu", "restauração de pneus", "troca da câmara de ar"]
    return listBorrachariaServicos[`${Math.floor(Math.random() * listBorrachariaServicos.length)}`]
  },
  eletrica: () => {
    const listEletricaServicos = ["troca de som", "troca de faróis", "instalação de painel eletrônico"]
    return listEletricaServicos[`${Math.floor(Math.random() * listEletricaServicos.length)}`]
  },
  vidro: () => {
    const listVidroServicos = ["troca de janelas dianteiras", "troca de janelas traseiras", "troca do para-brisa "]
    return listVidroServicos[`${Math.floor(Math.random() * listVidroServicos.length)}`]
  },
  pintura: () => {
    const listPinturaServicos = ["Pintura da lataria do carro", "pintura de pneus", "pintura de bancos"]
    return listPinturaServicos[`${Math.floor(Math.random() * listPinturaServicos.length)}`]
  },
  mecânica: () => {
    const listMecânicaServicos = ["troca de motor", "troca de óleo", "troca de eixo", "troca de filtros"]
    return listMecânicaServicos[`${Math.floor(Math.random() * listMecânicaServicos.length)}`]
  }
}

let iTipoServico = 1
const tipoServicos = []
const tipoServicosQuery = []
function criaTipoServico() {
  let saida = false;
  let tipoServico
  while (!saida) {

    let servicoRepetido = false
    const setor = setores[Math.floor(Math.random() * setores.length)]
    const tipoDeServicoDoSetor = dicTipoServico[setor.nome]()

    tipoServicos.forEach((tiposetor) => {
      if (tiposetor?.tipo_servico == tipoDeServicoDoSetor) servicoRepetido = true
    })


    if (!servicoRepetido) {
      tipoServico = {
        id_tipo_servico: iTipoServico,
        tipo_servico: tipoDeServicoDoSetor,
        id_setor: setor.id_setor
      }
      saida = true
    }
  }
  iTipoServico++
  return tipoServico
}

while (tipoServicos.length <= 10) {
  const tipoServico = criaTipoServico()
  tipoServicosQuery.push(`INSERT INTO TIPOS_SERVICOS ( TIPO_SERVICO, ID_SETOR ) VALUES ('${tipoServico.tipo_servico}',${tipoServico.id_setor})`)
  tipoServicos.push(tipoServico)
}


fs.readFile("./INSERTWG.txt", function (err, content) {

  let parseJson = enderecosQuery.join('\n') + '\n'
    + setoresQuery.join('\n') + '\n'
    + clientesQuery.join('\n') + '\n'
    + funcionariosQuery.join('\n')
    + '\n' + telefonesQuery.join('\n')
    + '\n' + veiculosQuery.join('\n')
    + '\n' + funcionarioSetoresQuery.join('\n')
    + '\n' + servicosQuery.join('\n')
  fs.appendFile("./INSERTWG.txt", parseJson, function (err) {

  })
})