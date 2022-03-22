import Leite from 'leite'
const leite = new Leite()

let iEndereco = 0;
let enderecos = [];
function criaEndereco() {
  const hasComplement = Math.floor(Math.random() * 2);
  const endereco = {
    id_endereco: iEndereco,
    rua: leite.localizacao.logradouro(),
    numero: leite.localizacao.numero(),
    bairro: leite.localizacao.bairro(),
    cidade: leite.localizacao.cidade(),
    uf: leite.localizacao.estado(),
    complemento: hasComplement ? leite.localizacao.complemento() : null,
  }
  iEndereco++;
  return endereco
}
while (iEndereco < 100) {
  enderecos.push(criaEndereco())
}

let iSetor = 0;
const nomeSetores = ["borracharia", "eletrica", "vidro", "pintura", "mecânica"];
const setores = [];
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
while (iSetor < countSetor) {
  setores.push(criaSetores())
}

const clientes = [];
function criaCliente() {
  const cliente = {
    nome: leite.pessoa.nome(),
    cpf: leite.pessoa.cpf({ formatado: true }),
    rg: leite.pessoa.rg(),
    data_nascimento: leite.pessoa.nascimento({ string: true }),
    id_endereco: Math.floor(Math.random() * enderecos.length)

  }
  return cliente
}
while (clientes.length < 10) {
  clientes.push(criaCliente())
}


let iFuncionario = 0;
const funcionarios = [];
function criaFuncionario() {
  const funcionario = {
    codigo_registro: iFuncionario,
    nome: leite.pessoa.nome(),
    cpf: leite.pessoa.cpf({ formatado: true }),
    rg: leite.pessoa.rg(),
    data_nascimento: leite.pessoa.nascimento({ string: true }),
    id_endereco: Math.floor(Math.random() * enderecos.length)

  }
  iFuncionario++;
  return funcionario
}
while (funcionarios.length < 10) {
  funcionarios.push(criaFuncionario())
}


let iTelefone = 0;
const telefones = [];
function criaTelefone() {

  let numero = leite.pessoa.cpf().split("")
  numero[2] = 9
  if (numero[1] == 0) {
    numero[1] = 1;
  }
  numero = numero.join('')


  const telefone = {
    id_telefone: iTelefone,
    id_pessoa: Math.floor(Math.random() * 2) ? clientes[Math.floor(Math.random() * clientes.length)].cpf : funcionarios[Math.floor(Math.random() * funcionarios.length)].cpf,
    telefone: numero,
  }
  iTelefone++;
  return telefone;
}
while (telefones.length < 10) {
  telefones.push(criaTelefone())
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
function criaVeiculo() {
  let chassi = ""
  while (chassi.length <= 17) {
    chassi = chassi + Math.floor(Math.random() * 17)
  }

  const date = new Date();
  const dataBaixa = date.subDays(Math.floor(Math.random() * 365 * 5))

  const diffTime = Math.abs(dataBaixa - new Date());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dataFabricacao = dataBaixa.addDays(Math.floor(Math.random() * diffDays))

  const veiculo = {
    renavam: leite.veiculo.renavam(),
    chassi: chassi,
    marca: leite.veiculo.marca(),
    modelo: leite.veiculo.modelo(),
    data_modelo: dataBaixa.toLocaleString().substr(0, 10),
    data_fabricacao: dataFabricacao.toLocaleString().substr(0, 10),
    id_cliente: Math.floor(Math.random() * 2) ? clientes[Math.floor(Math.random() * clientes.length)].cpf : funcionarios[Math.floor(Math.random() * funcionarios.length)].cpf
  }
  return veiculo
}

while (veiculos.length < 100) {
  veiculos.push(criaVeiculo())
}


let funcionarioSetores = []
function criaFuncionarioDosSetores() {
  const funcionarioSetor = {
    id_funcionario: Math.floor(Math.random() * funcionarios.length),
    id_setor: Math.floor(Math.random() * setores.length)
  }
  return funcionarioSetor;
}
while (funcionarioSetores.length < 10) {
  funcionarioSetores.push(criaFuncionarioDosSetores())
}

let iServicos = 0;
const servicos = []
function criaServicos() {

  const dicTempoExecucao = {
    borracharia: () => `${Math.floor(Math.random() * (4 - 2)) + 2}:00h`,
    eletrica: () => `${Math.floor(Math.random() * (7 - 4)) + 2}:00h`,
    vidro: () => `${Math.floor(Math.random() * (15 - 6)) + 2}:00h`,
    pintura: () => `${Math.floor(Math.random() * (24 - 14)) + 2}:00h`,
    mecânica: () => {
      return `${Math.floor(Math.random() * (7 - 2)) + 2}:00h`
    }
  }

  const rndSetor = Math.floor(Math.random() * setores.length)

  const nomeSetor = setores.find(setor => setor.id_setor == rndSetor).nome
  const carroId = Math.floor(Math.random() * veiculos.length)

  const dataDoCarro = veiculos[carroId].data_fabricacao.split('/')
  const dataConvertidaCarro = new Date(`${dataDoCarro[2]}-${dataDoCarro[1]}-${dataDoCarro[0]}`)

  const timeDiff = Math.abs(new Date().getTime() - dataConvertidaCarro.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const data_registro = dataConvertidaCarro.addDays(Math.floor(Math.random() * diffDays)).addHours(Math.floor(Math.random() * 24)).addMinutes(Math.floor(Math.random() * 60)).addSeconds(Math.floor(Math.random() * 60))

  const servico = {
    id_servico: iServicos,
    tempo_execucao: dicTempoExecucao[nomeSetor](),
    data_registro: data_registro,
    id_setor: rndSetor,
    id_veiculo: carroId

  }

  iServicos++;
  return servico
}

while (servicos.length < 10) {
  servicos.push(criaServicos())
}

let iAgendamento = 0;
const agendamentos = []
function criaAgendamento() {

  let saida = false;
  let agendamento = {}
  while (!saida) {

    const servicoId = Math.floor(Math.random() * servicos.length)

    let servicoRepetido = false

    agendamentos.forEach((agendamento) => {
      if (agendamento?.id_servico == servicoId) servicoRepetido = true
    })


    if (!servicoRepetido) {

      const servico_data_registro = servicos[servicoId].data_registro

      const dataAgendamento = servico_data_registro.addDays(Math.floor(Math.random() * 365))

      agendamento = {
        id_agendamento: iAgendamento,
        data_agendamento: dataAgendamento.toLocaleString().substr(0, 10),
        id_servico: servicoId,
      }

      iAgendamento++;
      saida = true

    }
  }
  return agendamento
}

while (agendamentos.length < 5 && agendamentos.length < servicos.length) {
  agendamentos.push(criaAgendamento())
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

let iTipoServico = 0
const tipoServicos = []
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

while (tipoServicos.length < 16) {
  tipoServicos.push(criaTipoServico())
}