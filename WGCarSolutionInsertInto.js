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
while (iEndereco < 10) {
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

while (veiculos.length < 10) {
  veiculos.push(criaVeiculo())
}

